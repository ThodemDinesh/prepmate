const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const subjectMappings = {
  'os': 'Operating Systems',
  'cn': 'Computer Networks', 
  'oops': 'Object Oriented Programming',
  'dbms': 'Database Management Systems',
  'system-design': 'System Design',
  'algorithms': 'Data Structures and Algorithms',
  'javascript': 'JavaScript Programming',
  'react': 'React.js Framework'
};

const generateQuizQuestions = async (subject, numQuestions, difficulty) => {
  try {
    const subjectName = subjectMappings[subject] || subject;
    
    // Try up to 3 times to get the exact number of questions
    for (let attempt = 1; attempt <= 3; attempt++) {
      console.log(`Attempt ${attempt} to generate ${numQuestions} questions for ${subjectName}`);
      
      const prompt = `Generate EXACTLY ${numQuestions} multiple choice questions for ${subjectName} at ${difficulty} difficulty level.

IMPORTANT: You must generate exactly ${numQuestions} questions, no more, no less.

For each question, provide:
1. A clear, well-structured question
2. Exactly 4 different answer options
3. The correct answer (must be exactly one of the 4 options)
4. A detailed explanation of why the correct answer is right

Requirements:
- Generate exactly ${numQuestions} questions
- Each question must have exactly 4 unique options
- The correct answer must match one of the options exactly
- Questions should be practical and test real understanding
- Avoid overly tricky or ambiguous questions
- ${difficulty === 'easy' ? 'Focus on basic concepts and definitions' : ''}
- ${difficulty === 'medium' ? 'Include application-based questions' : ''}
- ${difficulty === 'hard' ? 'Include complex scenarios and edge cases' : ''}

Respond with ONLY a valid JSON array containing exactly ${numQuestions} questions:
[
  {
    "question": "Question text here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Option A",
    "explanation": "Detailed explanation here"
  }
]

Do not include any markdown formatting, explanatory text, or anything other than the JSON array.`;

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are an expert educator creating quiz questions. You must generate EXACTLY ${numQuestions} questions. Always respond with only a valid JSON array containing exactly ${numQuestions} questions. No markdown, no additional text, no explanations outside the JSON.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        model: "llama3-8b-8192",
        temperature: 0.7,
        max_tokens: Math.max(2000, numQuestions * 300), // Ensure enough tokens
      });

      const response = completion.choices[0]?.message?.content;
      
      try {
        // Clean the response to extract only JSON
        let cleanedResponse = response.trim();
        
        // Remove markdown code blocks if present
        cleanedResponse = cleanedResponse.replace(/``````\s*$/, '');
        
        // Find JSON array
        const jsonMatch = cleanedResponse.match(/\[[\s\S]*\]/);
        const jsonString = jsonMatch ? jsonMatch[0] : cleanedResponse;
        
        const questions = JSON.parse(jsonString);
        
        // Validate questions format
        if (!Array.isArray(questions)) {
          throw new Error('Response is not an array');
        }
        
        console.log(`Raw response generated ${questions.length} questions, requested ${numQuestions}`);
        
        // Validate and filter questions
        const validQuestions = questions.filter((q, index) => {
          const isValid = q.question && 
            Array.isArray(q.options) && 
            q.options.length === 4 && 
            q.correctAnswer && 
            q.explanation &&
            q.options.includes(q.correctAnswer) &&
            q.options.every(option => option && option.trim().length > 0) &&
            q.options.filter((option, i, arr) => arr.indexOf(option) === i).length === 4; // Check for unique options
          
          if (!isValid) {
            console.log(`Question ${index + 1} is invalid:`, q);
          }
          
          return isValid;
        }).map(q => ({
          ...q,
          question: q.question.trim(),
          options: q.options.map(opt => opt.trim()),
          correctAnswer: q.correctAnswer.trim(),
          explanation: q.explanation.trim()
        }));
        
        console.log(`Valid questions after filtering: ${validQuestions.length}`);
        
        // If we have enough valid questions, return them
        if (validQuestions.length >= numQuestions) {
          return {
            success: true,
            questions: validQuestions.slice(0, numQuestions)
          };
        }
        
        // If we don't have enough questions and this is not the last attempt, try again
        if (attempt < 3) {
          console.log(`Only got ${validQuestions.length} valid questions, trying again...`);
          continue;
        }
        
        // Last attempt - supplement with fallback questions if needed
        const fallbackQuestions = getFallbackQuestions(subject, numQuestions - validQuestions.length, difficulty);
        const combinedQuestions = [...validQuestions, ...fallbackQuestions].slice(0, numQuestions);
        
        return {
          success: true,
          questions: combinedQuestions
        };
        
      } catch (parseError) {
        console.error(`JSON parse error on attempt ${attempt}:`, parseError);
        console.error('Raw response:', response);
        
        if (attempt === 3) {
          // Last attempt failed, return fallback questions
          return {
            success: true,
            questions: getFallbackQuestions(subject, numQuestions, difficulty)
          };
        }
      }
    }

  } catch (error) {
    console.error('Quiz generation error:', error);
    
    // Return fallback questions
    return {
      success: true,
      questions: getFallbackQuestions(subject, numQuestions, difficulty)
    };
  }
};

const getFallbackQuestions = (subject, numQuestions, difficulty) => {
  const fallbackQuestions = {
    'os': [
      {
        question: "What is the main function of an operating system?",
        options: ["Compile programs", "Manage computer resources", "Create databases", "Design websites"],
        correctAnswer: "Manage computer resources",
        explanation: "The primary function of an operating system is to manage and coordinate computer hardware and software resources."
      },
      {
        question: "Which scheduling algorithm gives the shortest job the highest priority?",
        options: ["FCFS", "SJF", "Round Robin", "Priority"],
        correctAnswer: "SJF",
        explanation: "Shortest Job First (SJF) scheduling algorithm assigns the highest priority to the job with the smallest execution time."
      },
      {
        question: "What does CPU stand for?",
        options: ["Central Processing Unit", "Computer Processing Unit", "Central Program Unit", "Computer Program Unit"],
        correctAnswer: "Central Processing Unit",
        explanation: "CPU stands for Central Processing Unit, which is the main processor that executes instructions in a computer."
      },
      {
        question: "Which of the following is a type of system call?",
        options: ["File operations", "HTTP requests", "Database queries", "Network protocols"],
        correctAnswer: "File operations",
        explanation: "File operations are a type of system call that allows programs to interact with the file system through the operating system."
      },
      {
        question: "What is virtual memory?",
        options: ["Physical RAM", "Storage technique using disk space", "CPU cache", "Graphics memory"],
        correctAnswer: "Storage technique using disk space",
        explanation: "Virtual memory is a memory management technique that uses disk space to extend the apparent amount of available RAM."
      }
    ],
    'algorithms': [
      {
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correctAnswer: "O(log n)",
        explanation: "Binary search divides the search space in half with each comparison, resulting in O(log n) time complexity."
      },
      {
        question: "Which data structure uses LIFO principle?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correctAnswer: "Stack",
        explanation: "Stack follows Last In First Out (LIFO) principle where the last element added is the first one to be removed."
      },
      {
        question: "What is the worst-case time complexity of QuickSort?",
        options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
        correctAnswer: "O(n²)",
        explanation: "QuickSort has O(n²) worst-case time complexity when the pivot is always the smallest or largest element."
      },
      {
        question: "Which traversal method visits nodes in a tree level by level?",
        options: ["Inorder", "Preorder", "Postorder", "Level-order"],
        correctAnswer: "Level-order",
        explanation: "Level-order traversal (BFS) visits all nodes at each level before moving to the next level."
      },
      {
        question: "What data structure is used to implement recursion?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correctAnswer: "Stack",
        explanation: "Recursion is implemented using a stack to keep track of function calls and their local variables."
      }
    ],
    'javascript': [
      {
        question: "What is the output of 'typeof null' in JavaScript?",
        options: ["null", "undefined", "object", "string"],
        correctAnswer: "object",
        explanation: "This is a known quirk in JavaScript. 'typeof null' returns 'object' due to a bug in the original implementation."
      },
      {
        question: "Which method adds elements to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: "push()",
        explanation: "The push() method adds one or more elements to the end of an array and returns the new length."
      },
      {
        question: "What does '===' operator do in JavaScript?",
        options: ["Assignment", "Loose equality", "Strict equality", "Not equal"],
        correctAnswer: "Strict equality",
        explanation: "The '===' operator checks for strict equality, comparing both value and type without type coercion."
      },
      {
        question: "Which keyword is used to declare a block-scoped variable?",
        options: ["var", "let", "const", "function"],
        correctAnswer: "let",
        explanation: "The 'let' keyword declares a block-scoped variable that can be reassigned."
      },
      {
        question: "What is a closure in JavaScript?",
        options: ["A function inside another function", "A way to close files", "A loop termination", "An error handling method"],
        correctAnswer: "A function inside another function",
        explanation: "A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function returns."
      }
    ],
    'react': [
      {
        question: "What is JSX in React?",
        options: ["A template engine", "JavaScript extension", "A CSS framework", "A database"],
        correctAnswer: "JavaScript extension",
        explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files."
      },
      {
        question: "Which hook is used for managing state in functional components?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: "useState",
        explanation: "useState is the primary hook for managing state in React functional components."
      },
      {
        question: "What is the purpose of useEffect hook?",
        options: ["Manage state", "Handle side effects", "Create components", "Style components"],
        correctAnswer: "Handle side effects",
        explanation: "useEffect hook is used to handle side effects like API calls, subscriptions, or DOM manipulation."
      },
      {
        question: "What is a React component?",
        options: ["A JavaScript function or class", "A CSS file", "An HTML template", "A database table"],
        correctAnswer: "A JavaScript function or class",
        explanation: "A React component is a JavaScript function or class that returns JSX to describe what should appear on the screen."
      },
      {
        question: "Which method is called when a component is first rendered?",
        options: ["componentDidUpdate", "componentDidMount", "componentWillUnmount", "render"],
        correctAnswer: "componentDidMount",
        explanation: "componentDidMount is called immediately after a component is mounted (inserted into the DOM tree)."
      }
    ],
    'cn': [
      {
        question: "What does TCP stand for?",
        options: ["Transfer Control Protocol", "Transmission Control Protocol", "Transport Control Protocol", "Terminal Control Protocol"],
        correctAnswer: "Transmission Control Protocol",
        explanation: "TCP stands for Transmission Control Protocol, a connection-oriented protocol that ensures reliable data delivery."
      },
      {
        question: "Which layer of OSI model handles routing?",
        options: ["Physical", "Data Link", "Network", "Transport"],
        correctAnswer: "Network",
        explanation: "The Network layer (Layer 3) of the OSI model is responsible for routing packets between different networks."
      },
      {
        question: "What is the default port number for HTTP?",
        options: ["21", "23", "80", "443"],
        correctAnswer: "80",
        explanation: "HTTP (HyperText Transfer Protocol) uses port 80 as its default port number."
      },
      {
        question: "What is the purpose of DNS?",
        options: ["Encrypt data", "Translate domain names to IP addresses", "Route packets", "Compress files"],
        correctAnswer: "Translate domain names to IP addresses",
        explanation: "DNS (Domain Name System) translates human-readable domain names into IP addresses that computers can understand."
      },
      {
        question: "Which protocol is connectionless?",
        options: ["TCP", "UDP", "HTTP", "FTP"],
        correctAnswer: "UDP",
        explanation: "UDP (User Datagram Protocol) is a connectionless protocol that doesn't establish a connection before sending data."
      }
    ],
    'dbms': [
      {
        question: "What does ACID stand for in database transactions?",
        options: ["Atomicity, Consistency, Isolation, Durability", "Access, Control, Integration, Data", "Authentication, Consistency, Integrity, Database", "Atomicity, Control, Isolation, Data"],
        correctAnswer: "Atomicity, Consistency, Isolation, Durability",
        explanation: "ACID represents the four key properties that guarantee reliable database transactions: Atomicity, Consistency, Isolation, and Durability."
      },
      {
        question: "What is a primary key?",
        options: ["A key that opens the database", "A unique identifier for records", "The first column in a table", "A password for database access"],
        correctAnswer: "A unique identifier for records",
        explanation: "A primary key is a column or combination of columns that uniquely identifies each record in a database table."
      },
      {
        question: "Which normal form eliminates transitive dependencies?",
        options: ["1NF", "2NF", "3NF", "4NF"],
        correctAnswer: "3NF",
        explanation: "Third Normal Form (3NF) eliminates transitive dependencies, where non-key attributes depend on other non-key attributes."
      },
      {
        question: "What is a foreign key?",
        options: ["A key from another database", "A reference to a primary key in another table", "An encrypted key", "A backup key"],
        correctAnswer: "A reference to a primary key in another table",
        explanation: "A foreign key is a field that references the primary key of another table, establishing a relationship between tables."
      },
      {
        question: "Which SQL command is used to retrieve data?",
        options: ["INSERT", "UPDATE", "DELETE", "SELECT"],
        correctAnswer: "SELECT",
        explanation: "The SELECT command is used to query and retrieve data from one or more database tables."
      }
    ],
    'oops': [
      {
        question: "What is encapsulation in OOP?",
        options: ["Hiding data and methods", "Creating multiple classes", "Inheriting properties", "Overriding methods"],
        correctAnswer: "Hiding data and methods",
        explanation: "Encapsulation is the concept of bundling data and methods together and hiding the internal implementation details from outside access."
      },
      {
        question: "What is inheritance?",
        options: ["Creating new objects", "Acquiring properties from parent class", "Hiding implementation", "Overloading methods"],
        correctAnswer: "Acquiring properties from parent class",
        explanation: "Inheritance allows a class to acquire properties and methods from another class, promoting code reusability."
      },
      {
        question: "What is polymorphism?",
        options: ["Having multiple forms", "Creating objects", "Hiding data", "Deleting objects"],
        correctAnswer: "Having multiple forms",
        explanation: "Polymorphism allows objects of different classes to be treated as objects of a common base class, enabling multiple forms of behavior."
      },
      {
        question: "What is abstraction?",
        options: ["Showing all details", "Hiding unnecessary details", "Creating concrete classes", "Deleting methods"],
        correctAnswer: "Hiding unnecessary details",
        explanation: "Abstraction is the concept of hiding complex implementation details while showing only the essential features of an object."
      },
      {
        question: "What is method overriding?",
        options: ["Creating new methods", "Redefining parent class methods", "Deleting methods", "Hiding methods"],
        correctAnswer: "Redefining parent class methods",
        explanation: "Method overriding allows a subclass to provide a specific implementation of a method that is already defined in its parent class."
      }
    ],
    'system-design': [
      {
        question: "What is horizontal scaling?",
        options: ["Adding more power to existing servers", "Adding more servers", "Reducing server count", "Upgrading software"],
        correctAnswer: "Adding more servers",
        explanation: "Horizontal scaling (scale-out) means adding more servers to handle increased load, rather than upgrading existing hardware."
      },
      {
        question: "What is a load balancer?",
        options: ["A type of database", "A component that distributes incoming requests", "A security tool", "A monitoring system"],
        correctAnswer: "A component that distributes incoming requests",
        explanation: "A load balancer distributes incoming network traffic across multiple servers to ensure optimal resource utilization and prevent overload."
      },
      {
        question: "What is database sharding?",
        options: ["Encrypting database", "Splitting database across multiple servers", "Backing up database", "Indexing database"],
        correctAnswer: "Splitting database across multiple servers",
        explanation: "Database sharding is a method of horizontally partitioning data across multiple database servers to improve performance and scalability."
      },
      {
        question: "What is caching?",
        options: ["Deleting old data", "Storing frequently accessed data in fast storage", "Encrypting data", "Compressing data"],
        correctAnswer: "Storing frequently accessed data in fast storage",
        explanation: "Caching is a technique that stores frequently accessed data in high-speed storage to reduce access time and improve performance."
      },
      {
        question: "What is microservices architecture?",
        options: ["A single large application", "Breaking application into small, independent services", "A database design pattern", "A security framework"],
        correctAnswer: "Breaking application into small, independent services",
        explanation: "Microservices architecture breaks down a large application into smaller, loosely coupled, independently deployable services."
      }
    ]
  };
  
  const questions = fallbackQuestions[subject] || fallbackQuestions['algorithms'];
  
  // If we need more questions than available, cycle through them
  const result = [];
  for (let i = 0; i < numQuestions; i++) {
    const questionIndex = i % questions.length;
    result.push({
      ...questions[questionIndex],
      question: `${questions[questionIndex].question}${i >= questions.length ? ` (Question ${i + 1})` : ''}`
    });
  }
  
  return result;
};

module.exports = {
  generateQuizQuestions
};
