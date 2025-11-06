
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   BookOpen, Clock, Star, TrendingUp, Award, Play, FileText,
//   CheckCircle2, Circle, PlayCircle, RotateCcw, ChevronRight,
//   Target, Zap, Code, Server, Database, Network, Box, Layers, GitBranch
// } from 'lucide-react';

// // Progress status colors
// const STATUS_COLORS = {
//   'not-started': {
//     bg: 'rgba(148, 163, 184, 0.1)',
//     border: '#94a3b8',
//     text: '#94a3b8',
//     icon: Circle
//   },
//   'in-progress': {
//     bg: 'rgba(251, 146, 60, 0.1)',
//     border: '#fb923c',
//     text: '#fb923c',
//     icon: PlayCircle
//   },
//   'completed': {
//     bg: 'rgba(34, 197, 94, 0.1)',
//     border: '#22c55e',
//     text: '#22c55e',
//     icon: CheckCircle2
//   }
// };

// // Main subject data with progress tracking
// const SUBJECTS_DATA = [
//   {
//     id: 'dsa',
//     title: 'Data Structures & Algorithms',
//     icon: Code,
//     gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     totalTopics: 15,
//     completedTopics: 0,
//     inProgressTopics: 0,
//     estimatedHours: 120,
//     level: 'Critical',
//     status: 'not-started',
//     needsRevisit: false,
//     roadmap: [
//       {
//         id: 1,
//         name: 'Arrays & Strings',
//         status: 'not-started',
//         difficulty: 'Easy',
//         duration: '8-10 hours',
//         importance: 5,
//         needsRevisit: false,
//         prerequisites: [],
//         youtube: 'https://www.youtube.com/watch?v=AT14lCXuMKI',
//         material: 'https://www.geeksforgeeks.org/array-data-structure/',
//         practiceProblems: 50
//       },
//       {
//         id: 2,
//         name: 'Linked Lists',
//         status: 'not-started',
//         difficulty: 'Medium',
//         duration: '6-8 hours',
//         importance: 4,
//         needsRevisit: false,
//         prerequisites: [1],
//         youtube: 'https://www.youtube.com/watch?v=R9PTBwOzceo',
//         material: 'https://www.geeksforgeeks.org/data-structures/linked-list/',
//         practiceProblems: 35
//       },
//       {
//         id: 3,
//         name: 'Stacks & Queues',
//         status: 'not-started',
//         difficulty: 'Medium',
//         duration: '5-7 hours',
//         importance: 4,
//         needsRevisit: false,
//         prerequisites: [1, 2],
//         youtube: 'https://www.youtube.com/watch?v=RBSGKlAvoiM',
//         material: 'https://www.geeksforgeeks.org/stack-data-structure/',
//         practiceProblems: 40
//       },
//       {
//         id: 4,
//         name: 'Trees & BST',
//         status: 'not-started',
//         difficulty: 'Hard',
//         duration: '12-15 hours',
//         importance: 5,
//         needsRevisit: false,
//         prerequisites: [2, 3],
//         youtube: 'https://www.youtube.com/watch?v=qH6yxkw0u78',
//         material: 'https://www.geeksforgeeks.org/binary-tree-data-structure/',
//         practiceProblems: 60
//       },
//       {
//         id: 5,
//         name: 'Graphs',
//         status: 'not-started',
//         difficulty: 'Hard',
//         duration: '15-18 hours',
//         importance: 5,
//         needsRevisit: false,
//         prerequisites: [4],
//         youtube: 'https://www.youtube.com/watch?v=tWVWeAqZ0WU',
//         material: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/',
//         practiceProblems: 55
//       },
//       {
//         id: 6,
//         name: 'Dynamic Programming',
//         status: 'not-started',
//         difficulty: 'Expert',
//         duration: '20-25 hours',
//         importance: 5,
//         needsRevisit: false,
//         prerequisites: [1, 4, 5],
//         youtube: 'https://www.youtube.com/watch?v=oBt53YbR9Kk',
//         material: 'https://www.geeksforgeeks.org/dynamic-programming/',
//         practiceProblems: 70
//       }
//     ]
//   },
//   {
//     id: 'os',
//     title: 'Operating Systems',
//     icon: Server,
//     gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//     totalTopics: 10,
//     completedTopics: 0,
//     inProgressTopics: 0,
//     estimatedHours: 80,
//     level: 'Essential',
//     status: 'not-started',
//     needsRevisit: false,
//     roadmap: [
//       {
//         id: 1,
//         name: 'Introduction to OS',
//         status: 'not-started',
//         difficulty: 'Easy',
//         duration: '4-5 hours',
//         importance: 3,
//         needsRevisit: false,
//         prerequisites: [],
//         youtube: 'https://www.youtube.com/watch?v=vBURTt97EkA',
//         material: 'https://www.geeksforgeeks.org/introduction-of-operating-system/',
//         practiceProblems: 15
//       },
//       {
//         id: 2,
//         name: 'Process Management',
//         status: 'not-started',
//         difficulty: 'Hard',
//         duration: '10-12 hours',
//         importance: 5,
//         needsRevisit: false,
//         prerequisites: [1],
//         youtube: 'https://www.youtube.com/watch?v=OrM7nZcxXZU',
//         material: 'https://www.geeksforgeeks.org/process-management-in-operating-system/',
//         practiceProblems: 25
//       },
//       {
//         id: 3,
//         name: 'CPU Scheduling',
//         status: 'not-started',
//         difficulty: 'Hard',
//         duration: '8-10 hours',
//         importance: 5,
//         needsRevisit: false,
//         prerequisites: [2],
//         youtube: 'https://www.youtube.com/watch?v=EWkQl0n0w5M',
//         material: 'https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/',
//         practiceProblems: 30
//       },
//       {
//         id: 4,
//         name: 'Deadlocks',
//         status: 'not-started',
//         difficulty: 'Hard',
//         duration: '8-10 hours',
//         importance: 5,
//         needsRevisit: false,
//         prerequisites: [2],
//         youtube: 'https://www.youtube.com/watch?v=UVo9mGARkhQ',
//         material: 'https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/',
//         practiceProblems: 30
//       },
//       {
//         id: 5,
//         name: 'Memory Management',
//         status: 'not-started',
//         difficulty: 'Hard',
//         duration: '10-12 hours',
//         importance: 5,
//         needsRevisit: false,
//         prerequisites: [1, 2],
//         youtube: 'https://www.youtube.com/watch?v=qdkxXygc3rE',
//         material: 'https://www.geeksforgeeks.org/memory-management-in-operating-system/',
//         practiceProblems: 28
//       }
//     ]
//   },
//   {
//     id: 'dbms',
//     title: 'Database Management',
//     icon: Database,
//     gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//     totalTopics: 12,
//     completedTopics: 0,
//     inProgressTopics: 0,
//     estimatedHours: 90,
//     level: 'Critical',
//     status: 'not-started',
//     needsRevisit: false,
//     roadmap: [
//       {
//         id: 1,
//         name: 'SQL Basics',
//         status: 'not-started',
//         difficulty: 'Easy',
//         duration: '6-8 hours',
//         importance: 5,
//         needsRevisit: false,
//         prerequisites: [],
//         youtube: 'https://www.youtube.com/watch?v=7S_tz1z_5bA',
//         material: 'https://www.geeksforgeeks.org/sql-tutorial/',
//         practiceProblems: 40
//       },
//       {
//         id: 2,
//         name: 'Normalization',
//         status: 'not-started',
//         difficulty: 'Hard',
//         duration: '8-10 hours',
//         importance: 5,
//         needsRevisit: false,
//         prerequisites: [1],
//         youtube: 'https://www.youtube.com/watch?v=GFQaEYEc8_8',
//         material: 'https://www.geeksforgeeks.org/normal-forms-in-dbms/',
//         practiceProblems: 35
//       },
//       {
//         id: 3,
//         name: 'Transactions & ACID',
//         status: 'not-started',
//         difficulty: 'Hard',
//         duration: '6-8 hours',
//         importance: 5,
//         needsRevisit: false,
//         prerequisites: [1],
//         youtube: 'https://www.youtube.com/watch?v=pomxJOFVcQs',
//         material: 'https://www.geeksforgeeks.org/acid-properties-in-dbms/',
//         practiceProblems: 25
//       },
//       {
//         id: 4,
//         name: 'Indexing',
//         status: 'not-started',
//         difficulty: 'Hard',
//         duration: '6-8 hours',
//         importance: 4,
//         needsRevisit: false,
//         prerequisites: [1, 2],
//         youtube: 'https://www.youtube.com/watch?v=aZjYr87r1b8',
//         material: 'https://www.geeksforgeeks.org/indexing-in-databases/',
//         practiceProblems: 22
//       }
//     ]
//   },
//   {
//     id: 'cn',
//     title: 'Computer Networks',
//     icon: Network,
//     gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
//     totalTopics: 11,
//     completedTopics: 0,
//     inProgressTopics: 0,
//     estimatedHours: 75,
//     level: 'Essential',
//     status: 'not-started',
//     needsRevisit: false,
//     roadmap: [
//       {
//         id: 1,
//         name: 'OSI Model',
//         status: 'not-started',
//         difficulty: 'Medium',
//         duration: '8-10 hours',
//         importance: 5,
//         needsRevisit: false,
//         prerequisites: [],
//         youtube: 'https://www.youtube.com/watch?v=vv4y_uOneC0',
//         material: 'https://www.geeksforgeeks.org/layers-of-osi-model/',
//         practiceProblems: 30
//       },
//       {
//         id: 2,
//         name: 'TCP/IP Protocol',
//         status: 'not-started',
//         difficulty: 'Medium',
//         duration: '6-8 hours',
//         importance: 5,
//         needsRevisit: false,
//         prerequisites: [1],
//         youtube: 'https://www.youtube.com/watch?v=F5rni9fr1yE',
//         material: 'https://www.geeksforgeeks.org/tcp-ip-model/',
//         practiceProblems: 25
//       },
//       {
//         id: 3,
//         name: 'IP Addressing',
//         status: 'not-started',
//         difficulty: 'Medium',
//         duration: '6-8 hours',
//         importance: 5,
//         needsRevisit: false,
//         prerequisites: [1, 2],
//         youtube: 'https://www.youtube.com/watch?v=5WfiTHiU4x8',
//         material: 'https://www.geeksforgeeks.org/introduction-of-classful-ip-addressing/',
//         practiceProblems: 40
//       }
//     ]
//   },
//   {
//     id: 'oop',
//     title: 'Object-Oriented Programming',
//     icon: Box,
//     gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
//     totalTopics: 9,
//     completedTopics: 0,
//     inProgressTopics: 0,
//     estimatedHours: 60,
//     level: 'Critical',
//     status: 'not-started',
//     needsRevisit: false,
//     roadmap: [
//       {
//         id: 1,
//         name: 'OOP Fundamentals',
//         status: 'not-started',
//         difficulty: 'Easy',
//         duration: '10-12 hours',
//         importance: 5,
//         needsRevisit: false,
//         prerequisites: [],
//         youtube: 'https://www.youtube.com/watch?v=pTB0EiLXUC8',
//         material: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/',
//         practiceProblems: 45
//       },
//       {
//         id: 2,
//         name: 'Inheritance',
//         status: 'not-started',
//         difficulty: 'Medium',
//         duration: '6-8 hours',
//         importance: 5,
//         needsRevisit: false,
//         prerequisites: [1],
//         youtube: 'https://www.youtube.com/watch?v=9JpNY-XAseg',
//         material: 'https://www.geeksforgeeks.org/inheritance-in-java/',
//         practiceProblems: 35
//       },
//       {
//         id: 3,
//         name: 'Polymorphism',
//         status: 'not-started',
//         difficulty: 'Medium',
//         duration: '6-8 hours',
//         importance: 5,
//         needsRevisit: false,
//         prerequisites: [1, 2],
//         youtube: 'https://www.youtube.com/watch?v=jhDUxynEQRI',
//         material: 'https://www.geeksforgeeks.org/polymorphism-in-java/',
//         practiceProblems: 30
//       }
//     ]
//   },
//   {
//     id: 'system-design',
//     title: 'System Design',
//     icon: Layers,
//     gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
//     totalTopics: 10,
//     completedTopics: 0,
//     inProgressTopics: 0,
//     estimatedHours: 100,
//     level: 'Advanced',
//     status: 'not-started',
//     needsRevisit: false,
//     roadmap: [
//       {
//         id: 1,
//         name: 'System Design Basics',
//         status: 'not-started',
//         difficulty: 'Medium',
//         duration: '10-12 hours',
//         importance: 5,
//         needsRevisit: false,
//         prerequisites: [],
//         youtube: 'https://www.youtube.com/watch?v=FSR1s2b-l_I',
//         material: 'https://www.geeksforgeeks.org/what-is-system-design-learn-system-design/',
//         practiceProblems: 15
//       },
//       {
//         id: 2,
//         name: 'Load Balancing',
//         status: 'not-started',
//         difficulty: 'Hard',
//         duration: '8-10 hours',
//         importance: 5,
//         needsRevisit: false,
//         prerequisites: [1],
//         youtube: 'https://www.youtube.com/watch?v=K0Ta65OqQkY',
//         material: 'https://www.geeksforgeeks.org/load-balancing-in-cloud-computing/',
//         practiceProblems: 12
//       }
//     ]
//   }
// ];

// // Status Badge Component
// const StatusBadge = ({ status }) => {
//   const config = STATUS_COLORS[status];
//   const Icon = config.icon;

//   return (
//     <div style={{
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       padding: '0.5rem 1rem',
//       borderRadius: '20px',
//       background: config.bg,
//       border: `2px solid ${config.border}`,
//       color: config.text,
//       fontWeight: 600,
//       fontSize: '0.875rem'
//     }}>
//       <Icon size={16} />
//       <span style={{ textTransform: 'capitalize' }}>
//         {status.replace('-', ' ')}
//       </span>
//     </div>
//   );
// };

// // Progress Bar Component
// const ProgressBar = ({ completed, total, needsRevisit }) => {
//   const percentage = (completed / total) * 100;

//   return (
//     <div>
//       <div style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: '0.5rem'
//       }}>
//         <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
//           Progress: {completed}/{total} topics
//         </span>
//         <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#22c55e' }}>
//           {Math.round(percentage)}%
//         </span>
//       </div>
//       <div style={{
//         width: '100%',
//         height: '8px',
//         background: 'rgba(255,255,255,0.1)',
//         borderRadius: '20px',
//         overflow: 'hidden',
//         position: 'relative'
//       }}>
//         <motion.div
//           initial={{ width: 0 }}
//           animate={{ width: `${percentage}%` }}
//           transition={{ duration: 1, ease: 'easeOut' }}
//           style={{
//             height: '100%',
//             background: needsRevisit 
//               ? 'linear-gradient(90deg, #fb923c 0%, #f59e0b 100%)'
//               : 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)',
//             borderRadius: '20px'
//           }}
//         />
//       </div>
//       {needsRevisit && (
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '0.5rem',
//           marginTop: '0.5rem',
//           color: '#fb923c',
//           fontSize: '0.875rem',
//           fontWeight: 600
//         }}>
//           <RotateCcw size={14} />
//           <span>Needs Revision</span>
//         </div>
//       )}
//     </div>
//   );
// };

// // Subject Card Component
// const SubjectCard = ({ subject, onClick }) => {
//   const Icon = subject.icon;
//   const statusConfig = STATUS_COLORS[subject.status];

//   return (
//     <motion.div
//       whileHover={{ scale: 1.02, y: -5 }}
//       whileTap={{ scale: 0.98 }}
//       onClick={onClick}
//       style={{
//         background: 'rgba(255,255,255,0.05)',
//         backdropFilter: 'blur(10px)',
//         borderRadius: '20px',
//         padding: '2rem',
//         border: '1px solid rgba(255,255,255,0.1)',
//         cursor: 'pointer',
//         position: 'relative',
//         overflow: 'hidden',
//         transition: 'all 0.3s'
//       }}
//     >
//       {/* Background gradient overlay */}
//       <div style={{
//         position: 'absolute',
//         top: 0,
//         right: 0,
//         width: '200px',
//         height: '200px',
//         background: subject.gradient,
//         opacity: 0.1,
//         borderRadius: '50%',
//         transform: 'translate(30%, -30%)'
//       }} />

//       {/* Revisit indicator */}
//       {subject.needsRevisit && (
//         <motion.div
//           animate={{
//             rotate: [0, 360],
//             scale: [1, 1.1, 1]
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             ease: 'easeInOut'
//           }}
//           style={{
//             position: 'absolute',
//             top: '1rem',
//             right: '1rem',
//             background: 'linear-gradient(135deg, #fb923c 0%, #f59e0b 100%)',
//             padding: '0.5rem',
//             borderRadius: '50%',
//             boxShadow: '0 0 20px rgba(251, 146, 60, 0.5)'
//           }}
//         >
//           <RotateCcw size={20} color="white" />
//         </motion.div>
//       )}

//       {/* Icon */}
//       <div style={{
//         background: subject.gradient,
//         width: '64px',
//         height: '64px',
//         borderRadius: '16px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginBottom: '1.5rem'
//       }}>
//         <Icon size={32} color="white" />
//       </div>

//       {/* Title and level */}
//       <h3 style={{
//         fontSize: '1.5rem',
//         fontWeight: 700,
//         marginBottom: '0.5rem',
//         color: 'white'
//       }}>
//         {subject.title}
//       </h3>

//       <div style={{
//         display: 'flex',
//         gap: '0.75rem',
//         alignItems: 'center',
//         marginBottom: '1.5rem',
//         flexWrap: 'wrap'
//       }}>
//         <StatusBadge status={subject.status} />
//         <span style={{
//           padding: '0.5rem 1rem',
//           borderRadius: '20px',
//           background: 'rgba(99, 102, 241, 0.2)',
//           color: '#a5b4fc',
//           fontSize: '0.875rem',
//           fontWeight: 600
//         }}>
//           {subject.level}
//         </span>
//       </div>

//       {/* Stats */}
//       <div style={{
//         display: 'flex',
//         gap: '1.5rem',
//         marginBottom: '1.5rem',
//         fontSize: '0.875rem',
//         color: 'rgba(255,255,255,0.7)'
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//           <BookOpen size={16} />
//           <span>{subject.totalTopics} topics</span>
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//           <Clock size={16} />
//           <span>~{subject.estimatedHours}hrs</span>
//         </div>
//       </div>

//       {/* Progress Bar */}
//       <ProgressBar 
//         completed={subject.completedTopics}
//         total={subject.totalTopics}
//         needsRevisit={subject.needsRevisit}
//       />

//       {/* View Roadmap button */}
//       <motion.div
//         whileHover={{ x: 5 }}
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '0.5rem',
//           marginTop: '1.5rem',
//           color: '#6366f1',
//           fontWeight: 600,
//           fontSize: '0.95rem'
//         }}
//       >
//         <span>View Roadmap</span>
//         <ChevronRight size={20} />
//       </motion.div>
//     </motion.div>
//   );
// };

// // Main Study Selection Page
// function StudySelectionPage({ onSelectSubject }) {
//   const [subjects, setSubjects] = useState(SUBJECTS_DATA);

//   // Calculate overall stats
//   const totalTopics = subjects.reduce((sum, s) => sum + s.totalTopics, 0);
//   const completedTopics = subjects.reduce((sum, s) => sum + s.completedTopics, 0);
//   const inProgressSubjects = subjects.filter(s => s.status === 'in-progress').length;
//   const completedSubjects = subjects.filter(s => s.status === 'completed').length;

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
//       color: 'white',
//       padding: '3rem 2rem'
//     }}>
//       <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           style={{ marginBottom: '3rem' }}
//         >
//           <h1 style={{
//             fontSize: '3rem',
//             fontWeight: 800,
//             marginBottom: '1rem',
//             background: 'linear-gradient(135deg, #fff 0%, #a78bfa 100%)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent'
//           }}>
//             📚 Your Learning Dashboard
//           </h1>
//           <p style={{
//             fontSize: '1.25rem',
//             color: 'rgba(255,255,255,0.7)',
//             marginBottom: '2rem'
//           }}>
//             Track your progress and master technical interviews
//           </p>

//           {/* Overall Stats */}
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
//             gap: '1.5rem',
//             marginTop: '2rem'
//           }}>
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               style={{
//                 background: 'rgba(99, 102, 241, 0.1)',
//                 backdropFilter: 'blur(10px)',
//                 padding: '1.5rem',
//                 borderRadius: '16px',
//                 border: '1px solid rgba(99, 102, 241, 0.3)'
//               }}
//             >
//               <Target size={32} color="#6366f1" style={{ marginBottom: '0.75rem' }} />
//               <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: '#6366f1' }}>
//                 {totalTopics}
//               </h3>
//               <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem', opacity: 0.8 }}>
//                 Total Topics
//               </p>
//             </motion.div>

//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               style={{
//                 background: 'rgba(34, 197, 94, 0.1)',
//                 backdropFilter: 'blur(10px)',
//                 padding: '1.5rem',
//                 borderRadius: '16px',
//                 border: '1px solid rgba(34, 197, 94, 0.3)'
//               }}
//             >
//               <CheckCircle2 size={32} color="#22c55e" style={{ marginBottom: '0.75rem' }} />
//               <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: '#22c55e' }}>
//                 {completedTopics}
//               </h3>
//               <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem', opacity: 0.8 }}>
//                 Topics Completed
//               </p>
//             </motion.div>

//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               style={{
//                 background: 'rgba(251, 146, 60, 0.1)',
//                 backdropFilter: 'blur(10px)',
//                 padding: '1.5rem',
//                 borderRadius: '16px',
//                 border: '1px solid rgba(251, 146, 60, 0.3)'
//               }}
//             >
//               <PlayCircle size={32} color="#fb923c" style={{ marginBottom: '0.75rem' }} />
//               <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: '#fb923c' }}>
//                 {inProgressSubjects}
//               </h3>
//               <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem', opacity: 0.8 }}>
//                 In Progress
//               </p>
//             </motion.div>

//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               style={{
//                 background: 'rgba(236, 72, 153, 0.1)',
//                 backdropFilter: 'blur(10px)',
//                 padding: '1.5rem',
//                 borderRadius: '16px',
//                 border: '1px solid rgba(236, 72, 153, 0.3)'
//               }}
//             >
//               <Award size={32} color="#ec4899" style={{ marginBottom: '0.75rem' }} />
//               <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: '#ec4899' }}>
//                 {completedSubjects}
//               </h3>
//               <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem', opacity: 0.8 }}>
//                 Subjects Mastered
//               </p>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Subjects Grid */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
//           gap: '2rem'
//         }}>
//           {subjects.map((subject, idx) => (
//             <motion.div
//               key={subject.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: idx * 0.1 }}
//             >
//               <SubjectCard 
//                 subject={subject}
//                 onClick={() => onSelectSubject(subject)}
//               />
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StudySelectionPage;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Clock, Star, TrendingUp, Award, Play, FileText,
  CheckCircle2, Circle, PlayCircle, RotateCcw, ChevronRight,
  Target, Zap, Code, Server, Database, Network, Box, Layers, 
  GitBranch, ChevronLeft
} from 'lucide-react';

// Progress status colors
const STATUS_COLORS = {
  'not-started': {
    bg: 'rgba(148, 163, 184, 0.1)',
    border: '#94a3b8',
    text: '#94a3b8',
    icon: Circle
  },
  'in-progress': {
    bg: 'rgba(251, 146, 60, 0.1)',
    border: '#fb923c',
    text: '#fb923c',
    icon: PlayCircle
  },
  'completed': {
    bg: 'rgba(34, 197, 94, 0.1)',
    border: '#22c55e',
    text: '#22c55e',
    icon: CheckCircle2
  }
};

// Main subject data with progress tracking
const SUBJECTS_DATA = [
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    icon: Code,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    totalTopics: 15,
    completedTopics: 0,
    inProgressTopics: 0,
    estimatedHours: 120,
    level: 'Critical',
    status: 'not-started',
    needsRevisit: false,
    roadmap: [
      {
        id: 1,
        name: 'Arrays & Strings',
        status: 'not-started',
        difficulty: 'Easy',
        duration: '8-10 hours',
        importance: 5,
        needsRevisit: false,
        prerequisites: [],
        youtube: 'https://www.youtube.com/watch?v=AT14lCXuMKI',
        material: 'https://www.geeksforgeeks.org/array-data-structure/',
        practiceProblems: 50
      },
      {
        id: 2,
        name: 'Linked Lists',
        status: 'not-started',
        difficulty: 'Medium',
        duration: '6-8 hours',
        importance: 4,
        needsRevisit: false,
        prerequisites: [1],
        youtube: 'https://www.youtube.com/watch?v=R9PTBwOzceo',
        material: 'https://www.geeksforgeeks.org/data-structures/linked-list/',
        practiceProblems: 35
      },
      {
        id: 3,
        name: 'Stacks & Queues',
        status: 'not-started',
        difficulty: 'Medium',
        duration: '5-7 hours',
        importance: 4,
        needsRevisit: false,
        prerequisites: [1, 2],
        youtube: 'https://www.youtube.com/watch?v=RBSGKlAvoiM',
        material: 'https://www.geeksforgeeks.org/stack-data-structure/',
        practiceProblems: 40
      },
      {
        id: 4,
        name: 'Trees & BST',
        status: 'not-started',
        difficulty: 'Hard',
        duration: '12-15 hours',
        importance: 5,
        needsRevisit: false,
        prerequisites: [2, 3],
        youtube: 'https://www.youtube.com/watch?v=qH6yxkw0u78',
        material: 'https://www.geeksforgeeks.org/binary-tree-data-structure/',
        practiceProblems: 60
      },
      {
        id: 5,
        name: 'Graphs',
        status: 'not-started',
        difficulty: 'Hard',
        duration: '15-18 hours',
        importance: 5,
        needsRevisit: false,
        prerequisites: [4],
        youtube: 'https://www.youtube.com/watch?v=tWVWeAqZ0WU',
        material: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/',
        practiceProblems: 55
      },
      {
        id: 6,
        name: 'Dynamic Programming',
        status: 'not-started',
        difficulty: 'Expert',
        duration: '20-25 hours',
        importance: 5,
        needsRevisit: false,
        prerequisites: [1, 4, 5],
        youtube: 'https://www.youtube.com/watch?v=oBt53YbR9Kk',
        material: 'https://www.geeksforgeeks.org/dynamic-programming/',
        practiceProblems: 70
      }
    ]
  },
  {
    id: 'os',
    title: 'Operating Systems',
    icon: Server,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    totalTopics: 10,
    completedTopics: 0,
    inProgressTopics: 0,
    estimatedHours: 80,
    level: 'Essential',
    status: 'not-started',
    needsRevisit: false,
    roadmap: [
      {
        id: 1,
        name: 'Introduction to OS',
        status: 'not-started',
        difficulty: 'Easy',
        duration: '4-5 hours',
        importance: 3,
        needsRevisit: false,
        prerequisites: [],
        youtube: 'https://www.youtube.com/watch?v=vBURTt97EkA',
        material: 'https://www.geeksforgeeks.org/introduction-of-operating-system/',
        practiceProblems: 15
      },
      {
        id: 2,
        name: 'Process Management',
        status: 'not-started',
        difficulty: 'Hard',
        duration: '10-12 hours',
        importance: 5,
        needsRevisit: false,
        prerequisites: [1],
        youtube: 'https://www.youtube.com/watch?v=OrM7nZcxXZU',
        material: 'https://www.geeksforgeeks.org/process-management-in-operating-system/',
        practiceProblems: 25
      },
      {
        id: 3,
        name: 'CPU Scheduling',
        status: 'not-started',
        difficulty: 'Hard',
        duration: '8-10 hours',
        importance: 5,
        needsRevisit: false,
        prerequisites: [2],
        youtube: 'https://www.youtube.com/watch?v=EWkQl0n0w5M',
        material: 'https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/',
        practiceProblems: 30
      },
      {
        id: 4,
        name: 'Deadlocks',
        status: 'not-started',
        difficulty: 'Hard',
        duration: '8-10 hours',
        importance: 5,
        needsRevisit: false,
        prerequisites: [2],
        youtube: 'https://www.youtube.com/watch?v=UVo9mGARkhQ',
        material: 'https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/',
        practiceProblems: 30
      },
      {
        id: 5,
        name: 'Memory Management',
        status: 'not-started',
        difficulty: 'Hard',
        duration: '10-12 hours',
        importance: 5,
        needsRevisit: false,
        prerequisites: [1, 2],
        youtube: 'https://www.youtube.com/watch?v=qdkxXygc3rE',
        material: 'https://www.geeksforgeeks.org/memory-management-in-operating-system/',
        practiceProblems: 28
      }
    ]
  },
  {
    id: 'dbms',
    title: 'Database Management',
    icon: Database,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    totalTopics: 12,
    completedTopics: 0,
    inProgressTopics: 0,
    estimatedHours: 90,
    level: 'Critical',
    status: 'not-started',
    needsRevisit: false,
    roadmap: [
      {
        id: 1,
        name: 'SQL Basics',
        status: 'not-started',
        difficulty: 'Easy',
        duration: '6-8 hours',
        importance: 5,
        needsRevisit: false,
        prerequisites: [],
        youtube: 'https://www.youtube.com/watch?v=7S_tz1z_5bA',
        material: 'https://www.geeksforgeeks.org/sql-tutorial/',
        practiceProblems: 40
      },
      {
        id: 2,
        name: 'Normalization',
        status: 'not-started',
        difficulty: 'Hard',
        duration: '8-10 hours',
        importance: 5,
        needsRevisit: false,
        prerequisites: [1],
        youtube: 'https://www.youtube.com/watch?v=GFQaEYEc8_8',
        material: 'https://www.geeksforgeeks.org/normal-forms-in-dbms/',
        practiceProblems: 35
      },
      {
        id: 3,
        name: 'Transactions & ACID',
        status: 'not-started',
        difficulty: 'Hard',
        duration: '6-8 hours',
        importance: 5,
        needsRevisit: false,
        prerequisites: [1],
        youtube: 'https://www.youtube.com/watch?v=pomxJOFVcQs',
        material: 'https://www.geeksforgeeks.org/acid-properties-in-dbms/',
        practiceProblems: 25
      },
      {
        id: 4,
        name: 'Indexing',
        status: 'not-started',
        difficulty: 'Hard',
        duration: '6-8 hours',
        importance: 4,
        needsRevisit: false,
        prerequisites: [1, 2],
        youtube: 'https://www.youtube.com/watch?v=aZjYr87r1b8',
        material: 'https://www.geeksforgeeks.org/indexing-in-databases/',
        practiceProblems: 22
      }
    ]
  },
  {
    id: 'cn',
    title: 'Computer Networks',
    icon: Network,
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    totalTopics: 11,
    completedTopics: 0,
    inProgressTopics: 0,
    estimatedHours: 75,
    level: 'Essential',
    status: 'not-started',
    needsRevisit: false,
    roadmap: [
      {
        id: 1,
        name: 'OSI Model',
        status: 'not-started',
        difficulty: 'Medium',
        duration: '8-10 hours',
        importance: 5,
        needsRevisit: false,
        prerequisites: [],
        youtube: 'https://www.youtube.com/watch?v=vv4y_uOneC0',
        material: 'https://www.geeksforgeeks.org/layers-of-osi-model/',
        practiceProblems: 30
      },
      {
        id: 2,
        name: 'TCP/IP Protocol',
        status: 'not-started',
        difficulty: 'Medium',
        duration: '6-8 hours',
        importance: 5,
        needsRevisit: false,
        prerequisites: [1],
        youtube: 'https://www.youtube.com/watch?v=F5rni9fr1yE',
        material: 'https://www.geeksforgeeks.org/tcp-ip-model/',
        practiceProblems: 25
      },
      {
        id: 3,
        name: 'IP Addressing',
        status: 'not-started',
        difficulty: 'Medium',
        duration: '6-8 hours',
        importance: 5,
        needsRevisit: false,
        prerequisites: [1, 2],
        youtube: 'https://www.youtube.com/watch?v=5WfiTHiU4x8',
        material: 'https://www.geeksforgeeks.org/introduction-of-classful-ip-addressing/',
        practiceProblems: 40
      }
    ]
  },
  {
    id: 'oop',
    title: 'Object-Oriented Programming',
    icon: Box,
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    totalTopics: 9,
    completedTopics: 0,
    inProgressTopics: 0,
    estimatedHours: 60,
    level: 'Critical',
    status: 'not-started',
    needsRevisit: false,
    roadmap: [
      {
        id: 1,
        name: 'OOP Fundamentals',
        status: 'not-started',
        difficulty: 'Easy',
        duration: '10-12 hours',
        importance: 5,
        needsRevisit: false,
        prerequisites: [],
        youtube: 'https://www.youtube.com/watch?v=pTB0EiLXUC8',
        material: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/',
        practiceProblems: 45
      },
      {
        id: 2,
        name: 'Inheritance',
        status: 'not-started',
        difficulty: 'Medium',
        duration: '6-8 hours',
        importance: 5,
        needsRevisit: false,
        prerequisites: [1],
        youtube: 'https://www.youtube.com/watch?v=9JpNY-XAseg',
        material: 'https://www.geeksforgeeks.org/inheritance-in-java/',
        practiceProblems: 35
      },
      {
        id: 3,
        name: 'Polymorphism',
        status: 'not-started',
        difficulty: 'Medium',
        duration: '6-8 hours',
        importance: 5,
        needsRevisit: false,
        prerequisites: [1, 2],
        youtube: 'https://www.youtube.com/watch?v=jhDUxynEQRI',
        material: 'https://www.geeksforgeeks.org/polymorphism-in-java/',
        practiceProblems: 30
      }
    ]
  },
  {
    id: 'system-design',
    title: 'System Design',
    icon: Layers,
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    totalTopics: 10,
    completedTopics: 0,
    inProgressTopics: 0,
    estimatedHours: 100,
    level: 'Advanced',
    status: 'not-started',
    needsRevisit: false,
    roadmap: [
      {
        id: 1,
        name: 'System Design Basics',
        status: 'not-started',
        difficulty: 'Medium',
        duration: '10-12 hours',
        importance: 5,
        needsRevisit: false,
        prerequisites: [],
        youtube: 'https://www.youtube.com/watch?v=FSR1s2b-l_I',
        material: 'https://www.geeksforgeeks.org/what-is-system-design-learn-system-design/',
        practiceProblems: 15
      },
      {
        id: 2,
        name: 'Load Balancing',
        status: 'not-started',
        difficulty: 'Hard',
        duration: '8-10 hours',
        importance: 5,
        needsRevisit: false,
        prerequisites: [1],
        youtube: 'https://www.youtube.com/watch?v=K0Ta65OqQkY',
        material: 'https://www.geeksforgeeks.org/load-balancing-in-cloud-computing/',
        practiceProblems: 12
      }
    ]
  }
];

// Status Badge Component
const StatusBadge = ({ status }) => {
  const config = STATUS_COLORS[status];
  const Icon = config.icon;

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      background: config.bg,
      border: `2px solid ${config.border}`,
      color: config.text,
      fontWeight: 600,
      fontSize: '0.875rem'
    }}>
      <Icon size={16} />
      <span style={{ textTransform: 'capitalize' }}>
        {status.replace('-', ' ')}
      </span>
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ completed, total, needsRevisit }) => {
  const percentage = (completed / total) * 100;

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem'
      }}>
        <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
          Progress: {completed}/{total} topics
        </span>
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#22c55e' }}>
          {Math.round(percentage)}%
        </span>
      </div>
      <div style={{
        width: '100%',
        height: '8px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: needsRevisit 
              ? 'linear-gradient(90deg, #fb923c 0%, #f59e0b 100%)'
              : 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)',
            borderRadius: '20px'
          }}
        />
      </div>
      {needsRevisit && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '0.5rem',
          color: '#fb923c',
          fontSize: '0.875rem',
          fontWeight: 600
        }}>
          <RotateCcw size={14} />
          <span>Needs Revision</span>
        </div>
      )}
    </div>
  );
};

// Subject Card Component
const SubjectCard = ({ subject, onClick }) => {
  const Icon = subject.icon;
  const statusConfig = STATUS_COLORS[subject.status];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '2rem',
        border: '1px solid rgba(255,255,255,0.1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s'
      }}
    >
      {/* Background gradient overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '200px',
        height: '200px',
        background: subject.gradient,
        opacity: 0.1,
        borderRadius: '50%',
        transform: 'translate(30%, -30%)'
      }} />

      {/* Revisit indicator */}
      {subject.needsRevisit && (
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'linear-gradient(135deg, #fb923c 0%, #f59e0b 100%)',
            padding: '0.5rem',
            borderRadius: '50%',
            boxShadow: '0 0 20px rgba(251, 146, 60, 0.5)'
          }}
        >
          <RotateCcw size={20} color="white" />
        </motion.div>
      )}

      {/* Icon */}
      <div style={{
        background: subject.gradient,
        width: '64px',
        height: '64px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem'
      }}>
        <Icon size={32} color="white" />
      </div>

      {/* Title and level */}
      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: 700,
        marginBottom: '0.5rem',
        color: 'white'
      }}>
        {subject.title}
      </h3>

      <div style={{
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap'
      }}>
        <StatusBadge status={subject.status} />
        <span style={{
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          background: 'rgba(99, 102, 241, 0.2)',
          color: '#a5b4fc',
          fontSize: '0.875rem',
          fontWeight: 600
        }}>
          {subject.level}
        </span>
      </div>

      {/* Stats */}
      <div style={{
        display: 'flex',
        gap: '1.5rem',
        marginBottom: '1.5rem',
        fontSize: '0.875rem',
        color: 'rgba(255,255,255,0.7)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={16} />
          <span>{subject.totalTopics} topics</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={16} />
          <span>~{subject.estimatedHours}hrs</span>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar 
        completed={subject.completedTopics}
        total={subject.totalTopics}
        needsRevisit={subject.needsRevisit}
      />

      {/* View Roadmap button */}
      <motion.div
        whileHover={{ x: 5 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '1.5rem',
          color: '#6366f1',
          fontWeight: 600,
          fontSize: '0.95rem'
        }}
      >
        <span>View Roadmap</span>
        <ChevronRight size={20} />
      </motion.div>
    </motion.div>
  );
};

// Main Study Selection Page
function StudySelectionPage({ onSelectSubject, onNavigate }) {
  const [subjects, setSubjects] = useState(SUBJECTS_DATA);

  // Calculate overall stats
  const totalTopics = subjects.reduce((sum, s) => sum + s.totalTopics, 0);
  const completedTopics = subjects.reduce((sum, s) => sum + s.completedTopics, 0);
  const inProgressSubjects = subjects.filter(s => s.status === 'in-progress').length;
  const completedSubjects = subjects.filter(s => s.status === 'completed').length;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      color: 'white',
      padding: '3rem 2rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '3rem' }}
        >
          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('dashboard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '12px',
              padding: '0.75rem 1.25rem',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.95rem',
              marginBottom: '2rem',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s'
            }}
          >
            <ChevronLeft size={20} />
            <span>Back to Dashboard</span>
          </motion.button>
           <div style={{ display: 'flex',  gap: '0.5rem' }}>
            <h1 style={{ fontSize: '3rem', margin: 0 }}>📚</h1>
            <h1
              style={{
                fontSize: '3rem',
                fontWeight: 800,
                margin: 0,
                background: 'linear-gradient(135deg, #fff 0%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Your Learning Dashboard
            </h1>
          </div>

          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '2rem'
          }}>
            Track your progress and master technical interviews
          </p>

          {/* Overall Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'rgba(99, 102, 241, 0.1)',
                backdropFilter: 'blur(10px)',
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px solid rgba(99, 102, 241, 0.3)'
              }}
            >
              <Target size={32} color="#6366f1" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: '#6366f1' }}>
                {totalTopics}
              </h3>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem', opacity: 0.8 }}>
                Total Topics
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                backdropFilter: 'blur(10px)',
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px solid rgba(34, 197, 94, 0.3)'
              }}
            >
              <CheckCircle2 size={32} color="#22c55e" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: '#22c55e' }}>
                {completedTopics}
              </h3>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem', opacity: 0.8 }}>
                Topics Completed
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'rgba(251, 146, 60, 0.1)',
                backdropFilter: 'blur(10px)',
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px solid rgba(251, 146, 60, 0.3)'
              }}
            >
              <PlayCircle size={32} color="#fb923c" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: '#fb923c' }}>
                {inProgressSubjects}
              </h3>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem', opacity: 0.8 }}>
                In Progress
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'rgba(236, 72, 153, 0.1)',
                backdropFilter: 'blur(10px)',
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px solid rgba(236, 72, 153, 0.3)'
              }}
            >
              <Award size={32} color="#ec4899" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: '#ec4899' }}>
                {completedSubjects}
              </h3>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem', opacity: 0.8 }}>
                Subjects Mastered
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Subjects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '2rem'
        }}>
          {subjects.map((subject, idx) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <SubjectCard 
                subject={subject}
                onClick={() => onSelectSubject(subject)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudySelectionPage;
