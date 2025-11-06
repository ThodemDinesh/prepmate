// // DuolingoRoadmap.jsx
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   CheckCircle2, Circle, Lock, PlayCircle, Star, Clock, Trophy,
//   Target, Zap, Award, TrendingUp, BookOpen, Play, FileText,
//   RotateCcw, X, ChevronLeft, Flame, Heart, Shield
// } from 'lucide-react';

// // Difficulty colors
// const DIFFICULTY_COLORS = {
//   Easy: { bg: '#dcfce7', text: '#166534', border: '#86efac' },
//   Medium: { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
//   Hard: { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
//   Expert: { bg: '#f3e8ff', text: '#6b21a8', border: '#d8b4fe' }
// };

// // Topic Node Component (Duolingo-style circle)
// const TopicNode = ({ topic, position, isLocked, onClick, pathColor }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   // Determine node appearance based on status
//   const getNodeStyle = () => {
//     if (isLocked) {
//       return {
//         background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
//         border: '4px solid #334155',
//         icon: Lock,
//         iconColor: '#94a3b8',
//         shadow: '0 4px 12px rgba(0,0,0,0.3)'
//       };
//     }
    
//     switch (topic.status) {
//       case 'completed':
//         return {
//           background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
//           border: '4px solid #15803d',
//           icon: CheckCircle2,
//           iconColor: 'white',
//           shadow: '0 8px 24px rgba(34, 197, 94, 0.4)'
//         };
//       case 'in-progress':
//         return {
//           background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
//           border: '4px solid #ea580c',
//           icon: PlayCircle,
//           iconColor: 'white',
//           shadow: '0 8px 24px rgba(251, 146, 60, 0.4)'
//         };
//       default:
//         return {
//           background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
//           border: '4px solid #4338ca',
//           icon: Circle,
//           iconColor: 'white',
//           shadow: '0 6px 18px rgba(99, 102, 241, 0.4)'
//         };
//     }
//   };

//   const nodeStyle = getNodeStyle();
//   const NodeIcon = nodeStyle.icon;

//   return (
//     <motion.div
//       initial={{ scale: 0, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       transition={{ 
//         type: 'spring',
//         stiffness: 260,
//         damping: 20,
//         delay: position * 0.15
//       }}
//       whileHover={{ scale: isLocked ? 1 : 1.1 }}
//       whileTap={{ scale: isLocked ? 1 : 0.95 }}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       onClick={() => !isLocked && onClick(topic)}
//       style={{
//         position: 'relative',
//         cursor: isLocked ? 'not-allowed' : 'pointer',
//         zIndex: isHovered ? 10 : 1
//       }}
//     >
//       {/* Revisit indicator */}
//       {topic.needsRevisit && !isLocked && (
//         <motion.div
//           animate={{
//             rotate: [0, 360],
//             scale: [1, 1.2, 1]
//           }}
//           transition={{
//             duration: 3,
//             repeat: Infinity,
//             ease: 'easeInOut'
//           }}
//           style={{
//             position: 'absolute',
//             top: '-10px',
//             right: '-10px',
//             background: 'linear-gradient(135deg, #fb923c 0%, #f59e0b 100%)',
//             borderRadius: '50%',
//             padding: '8px',
//             boxShadow: '0 0 20px rgba(251, 146, 60, 0.6)',
//             border: '3px solid white',
//             zIndex: 2
//           }}
//         >
//           <RotateCcw size={18} color="white" />
//         </motion.div>
//       )}

//       {/* Star rating for importance */}
//       {!isLocked && topic.importance === 5 && (
//         <motion.div
//           animate={{
//             y: [0, -5, 0]
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             ease: 'easeInOut'
//           }}
//           style={{
//             position: 'absolute',
//             top: '-15px',
//             left: '50%',
//             transform: 'translateX(-50%)',
//             background: '#fbbf24',
//             borderRadius: '50%',
//             padding: '6px',
//             boxShadow: '0 0 15px rgba(251, 191, 36, 0.6)',
//             border: '2px solid white',
//             zIndex: 2
//           }}
//         >
//           <Star size={14} fill="#fbbf24" color="white" />
//         </motion.div>
//       )}

//       {/* Main node circle */}
//       <motion.div
//         animate={{
//           boxShadow: isHovered && !isLocked 
//             ? ['0 8px 24px rgba(99, 102, 241, 0.4)', '0 12px 32px rgba(99, 102, 241, 0.6)']
//             : nodeStyle.shadow
//         }}
//         transition={{ duration: 0.3 }}
//         style={{
//           width: '100px',
//           height: '100px',
//           borderRadius: '50%',
//           background: nodeStyle.background,
//           border: nodeStyle.border,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           position: 'relative',
//           boxShadow: nodeStyle.shadow
//         }}
//       >
//         <NodeIcon size={40} color={nodeStyle.iconColor} />
//       </motion.div>

//       {/* Topic label */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: position * 0.15 + 0.2 }}
//         style={{
//           marginTop: '1rem',
//           textAlign: 'center',
//           maxWidth: '140px'
//         }}
//       >
//         <p style={{
//           fontSize: '0.95rem',
//           fontWeight: 600,
//           color: 'white',
//           margin: 0,
//           textShadow: '0 2px 4px rgba(0,0,0,0.3)'
//         }}>
//           {topic.name}
//         </p>
//         <div style={{
//           display: 'flex',
//           gap: '0.5rem',
//           justifyContent: 'center',
//           marginTop: '0.5rem',
//           fontSize: '0.75rem',
//           color: 'rgba(255,255,255,0.7)'
//         }}>
//           <span>{topic.difficulty}</span>
//           <span>•</span>
//           <span>{topic.duration.split('-')[0]}</span>
//         </div>
//       </motion.div>

//       {/* Hover tooltip */}
//       <AnimatePresence>
//         {isHovered && !isLocked && (
//           <motion.div
//             initial={{ opacity: 0, y: 10, scale: 0.9 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 10, scale: 0.9 }}
//             style={{
//               position: 'absolute',
//               top: '120%',
//               left: '50%',
//               transform: 'translateX(-50%)',
//               background: 'rgba(15, 23, 42, 0.95)',
//               backdropFilter: 'blur(10px)',
//               padding: '1rem',
//               borderRadius: '12px',
//               border: '1px solid rgba(255,255,255,0.2)',
//               minWidth: '220px',
//               zIndex: 20,
//               boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
//             }}
//           >
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '0.5rem',
//               marginBottom: '0.5rem'
//             }}>
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   size={12}
//                   fill={i < topic.importance ? '#fbbf24' : 'none'}
//                   color={i < topic.importance ? '#fbbf24' : '#64748b'}
//                 />
//               ))}
//             </div>
//             <p style={{
//               fontSize: '0.875rem',
//               color: 'rgba(255,255,255,0.9)',
//               margin: 0
//             }}>
//               {topic.practiceProblems} practice problems
//             </p>
//             <p style={{
//               fontSize: '0.75rem',
//               color: 'rgba(255,255,255,0.6)',
//               margin: '0.25rem 0 0 0'
//             }}>
//               Click to view details
//             </p>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };

// // Connecting Path SVG Component
// const ConnectionPath = ({ from, to, isActive }) => {
//   return (
//     <motion.path
//       d={`M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${(from.y + to.y) / 2 + 50} ${to.x} ${to.y}`}
//       stroke={isActive ? '#6366f1' : '#334155'}
//       strokeWidth={isActive ? 6 : 4}
//       strokeLinecap="round"
//       strokeDasharray={isActive ? '0' : '10,5'}
//       fill="none"
//       initial={{ pathLength: 0, opacity: 0 }}
//       animate={{ pathLength: 1, opacity: 1 }}
//       transition={{ duration: 0.8, ease: 'easeInOut' }}
//     />
//   );
// };

// // Topic Detail Modal
// const TopicDetailModal = ({ topic, onClose, onStatusChange, gradient }) => {
//   const difficultyStyle = DIFFICULTY_COLORS[topic.difficulty];

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       onClick={onClose}
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         background: 'rgba(0,0,0,0.8)',
//         backdropFilter: 'blur(8px)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         zIndex: 1000,
//         padding: '2rem'
//       }}
//     >
//       <motion.div
//         initial={{ scale: 0.9, y: 20 }}
//         animate={{ scale: 1, y: 0 }}
//         exit={{ scale: 0.9, y: 20 }}
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
//           borderRadius: '24px',
//           maxWidth: '600px',
//           width: '100%',
//           maxHeight: '90vh',
//           overflow: 'auto',
//           position: 'relative',
//           border: '1px solid rgba(255,255,255,0.1)',
//           boxShadow: '0 24px 48px rgba(0,0,0,0.4)'
//         }}
//       >
//         {/* Header with gradient */}
//         <div style={{
//           background: gradient,
//           padding: '2rem',
//           borderTopLeftRadius: '24px',
//           borderTopRightRadius: '24px',
//           position: 'relative'
//         }}>
//           <motion.button
//             whileHover={{ scale: 1.1, rotate: 90 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={onClose}
//             style={{
//               position: 'absolute',
//               top: '1rem',
//               right: '1rem',
//               background: 'rgba(255,255,255,0.2)',
//               border: 'none',
//               borderRadius: '50%',
//               width: '40px',
//               height: '40px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               cursor: 'pointer',
//               backdropFilter: 'blur(10px)'
//             }}
//           >
//             <X size={20} color="white" />
//           </motion.button>

//           <h2 style={{
//             fontSize: '2rem',
//             fontWeight: 700,
//             color: 'white',
//             margin: 0,
//             marginBottom: '1rem',
//             paddingRight: '3rem'
//           }}>
//             {topic.name}
//           </h2>

//           <div style={{
//             display: 'flex',
//             gap: '1rem',
//             flexWrap: 'wrap',
//             alignItems: 'center'
//           }}>
//             <span style={{
//               padding: '0.5rem 1rem',
//               borderRadius: '20px',
//               background: difficultyStyle.bg,
//               color: difficultyStyle.text,
//               fontWeight: 600,
//               fontSize: '0.875rem',
//               border: `2px solid ${difficultyStyle.border}`
//             }}>
//               {topic.difficulty}
//             </span>
            
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '0.5rem',
//               background: 'rgba(255,255,255,0.2)',
//               padding: '0.5rem 1rem',
//               borderRadius: '20px'
//             }}>
//               <Clock size={16} />
//               <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
//                 {topic.duration}
//               </span>
//             </div>

//             <div style={{ display: 'flex', gap: '0.25rem' }}>
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   size={16}
//                   fill={i < topic.importance ? '#fbbf24' : 'none'}
//                   color={i < topic.importance ? '#fbbf24' : 'rgba(255,255,255,0.4)'}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div style={{ padding: '2rem' }}>
//           {/* Practice Problems */}
//           <div style={{
//             background: 'rgba(99, 102, 241, 0.1)',
//             border: '1px solid rgba(99, 102, 241, 0.3)',
//             borderRadius: '16px',
//             padding: '1.5rem',
//             marginBottom: '2rem'
//           }}>
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '0.75rem',
//               marginBottom: '0.5rem'
//             }}>
//               <Target size={24} color="#6366f1" />
//               <h3 style={{
//                 fontSize: '1.25rem',
//                 fontWeight: 600,
//                 color: 'white',
//                 margin: 0
//               }}>
//                 Practice Problems
//               </h3>
//             </div>
//             <p style={{
//               fontSize: '2rem',
//               fontWeight: 700,
//               color: '#6366f1',
//               margin: 0
//             }}>
//               {topic.practiceProblems} problems
//             </p>
//           </div>

//           {/* Status Change Buttons */}
//           <div style={{ marginBottom: '2rem' }}>
//             <h4 style={{
//               fontSize: '1rem',
//               fontWeight: 600,
//               color: 'rgba(255,255,255,0.9)',
//               marginBottom: '1rem'
//             }}>
//               Update Status:
//             </h4>
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(3, 1fr)',
//               gap: '0.75rem'
//             }}>
//               {['not-started', 'in-progress', 'completed'].map((status) => {
//                 const isActive = topic.status === status;
//                 const colors = {
//                   'not-started': '#94a3b8',
//                   'in-progress': '#fb923c',
//                   'completed': '#22c55e'
//                 };
                
//                 return (
//                   <motion.button
//                     key={status}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => onStatusChange(topic.id, status)}
//                     style={{
//                       padding: '0.875rem',
//                       borderRadius: '12px',
//                       border: `2px solid ${isActive ? colors[status] : 'rgba(255,255,255,0.1)'}`,
//                       background: isActive 
//                         ? `${colors[status]}20`
//                         : 'rgba(255,255,255,0.05)',
//                       color: isActive ? colors[status] : 'rgba(255,255,255,0.6)',
//                       fontWeight: 600,
//                       fontSize: '0.875rem',
//                       cursor: 'pointer',
//                       textTransform: 'capitalize',
//                       transition: 'all 0.3s'
//                     }}
//                   >
//                     {status.replace('-', ' ')}
//                   </motion.button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Revisit Toggle */}
//           <div style={{
//             background: topic.needsRevisit 
//               ? 'rgba(251, 146, 60, 0.1)'
//               : 'rgba(255,255,255,0.05)',
//             border: `2px solid ${topic.needsRevisit ? '#fb923c' : 'rgba(255,255,255,0.1)'}`,
//             borderRadius: '16px',
//             padding: '1.5rem',
//             marginBottom: '2rem'
//           }}>
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.75rem'
//               }}>
//                 <RotateCcw size={24} color={topic.needsRevisit ? '#fb923c' : '#94a3b8'} />
//                 <div>
//                   <h4 style={{
//                     fontSize: '1rem',
//                     fontWeight: 600,
//                     color: 'white',
//                     margin: 0
//                   }}>
//                     Mark for Revision
//                   </h4>
//                   <p style={{
//                     fontSize: '0.875rem',
//                     color: 'rgba(255,255,255,0.6)',
//                     margin: '0.25rem 0 0 0'
//                   }}>
//                     {topic.needsRevisit ? 'Marked for review' : 'Mark this topic to revisit later'}
//                   </p>
//                 </div>
//               </div>
              
//               <motion.button
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => onStatusChange(topic.id, null, !topic.needsRevisit)}
//                 style={{
//                   width: '56px',
//                   height: '32px',
//                   borderRadius: '16px',
//                   background: topic.needsRevisit 
//                     ? 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)'
//                     : 'rgba(255,255,255,0.2)',
//                   border: 'none',
//                   cursor: 'pointer',
//                   position: 'relative',
//                   transition: 'all 0.3s'
//                 }}
//               >
//                 <motion.div
//                   animate={{
//                     x: topic.needsRevisit ? 24 : 0
//                   }}
//                   transition={{ type: 'spring', stiffness: 500, damping: 30 }}
//                   style={{
//                     width: '28px',
//                     height: '28px',
//                     borderRadius: '50%',
//                     background: 'white',
//                     position: 'absolute',
//                     top: '2px',
//                     left: '2px',
//                     boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
//                   }}
//                 />
//               </motion.button>
//             </div>
//           </div>

//           {/* Resource Links */}
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: '1fr 1fr',
//             gap: '1rem'
//           }}>
//             <motion.a
//               href={topic.youtube}
//               target="_blank"
//               rel="noopener noreferrer"
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.75rem',
//                 padding: '1.25rem',
//                 borderRadius: '16px',
//                 background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
//                 color: 'white',
//                 textDecoration: 'none',
//                 fontWeight: 600,
//                 boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
//                 justifyContent: 'center'
//               }}
//             >
//               <Play size={20} />
//               <span>Watch Video</span>
//             </motion.a>

//             <motion.a
//               href={topic.material}
//               target="_blank"
//               rel="noopener noreferrer"
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.75rem',
//                 padding: '1.25rem',
//                 borderRadius: '16px',
//                 background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
//                 color: 'white',
//                 textDecoration: 'none',
//                 fontWeight: 600,
//                 boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
//                 justifyContent: 'center'
//               }}
//             >
//               <FileText size={20} />
//               <span>Read Material</span>
//             </motion.a>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// // Main Duolingo Roadmap Component
// function DuolingoRoadmap({ subject, onBack }) {
//   const [roadmapData, setRoadmapData] = useState(subject.roadmap);
//   const [selectedTopic, setSelectedTopic] = useState(null);
//   const [userStats, setUserStats] = useState({
//     streak: 7,
//     hearts: 5,
//     xp: 1250
//   });

//   // Calculate progress
//   const completedCount = roadmapData.filter(t => t.status === 'completed').length;
//   const progressPercentage = (completedCount / roadmapData.length) * 100;

//   // Check if topic is locked based on prerequisites
//   const isTopicLocked = (topic) => {
//     if (topic.prerequisites.length === 0) return false;
//     return !topic.prerequisites.every(preReqId => {
//       const preReqTopic = roadmapData.find(t => t.id === preReqId);
//       return preReqTopic && preReqTopic.status === 'completed';
//     });
//   };

//   // Handle status change
//   const handleStatusChange = (topicId, newStatus, toggleRevisit = null) => {
//     setRoadmapData(prev => prev.map(topic => {
//       if (topic.id === topicId) {
//         const updates = {};
//         if (newStatus !== null) updates.status = newStatus;
//         if (toggleRevisit !== null) updates.needsRevisit = toggleRevisit;
//         return { ...topic, ...updates };
//       }
//       return topic;
//     }));
//   };

//   const SubjectIcon = subject.icon;

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
//       color: 'white',
//       position: 'relative',
//       overflow: 'hidden'
//     }}>
//       {/* Animated background elements */}
//       <div style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         opacity: 0.05,
//         pointerEvents: 'none'
//       }}>
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             animate={{
//               y: [0, -30, 0],
//               opacity: [0.3, 0.6, 0.3]
//             }}
//             transition={{
//               duration: 3 + i * 0.2,
//               repeat: Infinity,
//               ease: 'easeInOut'
//             }}
//             style={{
//               position: 'absolute',
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               width: '100px',
//               height: '100px',
//               borderRadius: '50%',
//               background: subject.gradient
//             }}
//           />
//         ))}
//       </div>

//       {/* Top Navigation Bar */}
//       <div style={{
//         background: 'rgba(15, 23, 42, 0.8)',
//         backdropFilter: 'blur(10px)',
//         borderBottom: '1px solid rgba(255,255,255,0.1)',
//         padding: '1rem 2rem',
//         position: 'sticky',
//         top: 0,
//         zIndex: 100
//       }}>
//         <div style={{
//           maxWidth: '1400px',
//           margin: '0 auto',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center'
//         }}>
//           {/* Back button and title */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//             <motion.button
//               whileHover={{ scale: 1.05, x: -5 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={onBack}
//               style={{
//                 background: 'rgba(255,255,255,0.1)',
//                 border: '1px solid rgba(255,255,255,0.2)',
//                 borderRadius: '12px',
//                 padding: '0.75rem',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.5rem',
//                 color: 'white',
//                 cursor: 'pointer',
//                 fontWeight: 600
//               }}
//             >
//               <ChevronLeft size={20} />
//               <span>Back</span>
//             </motion.button>

//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '1rem'
//             }}>
//               <div style={{
//                 background: subject.gradient,
//                 padding: '0.75rem',
//                 borderRadius: '12px'
//               }}>
//                 <SubjectIcon size={24} />
//               </div>
//               <div>
//                 <h2 style={{
//                   fontSize: '1.25rem',
//                   fontWeight: 700,
//                   margin: 0
//                 }}>
//                   {subject.title}
//                 </h2>
//                 <p style={{
//                   fontSize: '0.875rem',
//                   color: 'rgba(255,255,255,0.6)',
//                   margin: 0
//                 }}>
//                   {completedCount} of {roadmapData.length} completed
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* User stats (Duolingo-style) */}
//           <div style={{
//             display: 'flex',
//             gap: '2rem',
//             alignItems: 'center'
//           }}>
//             {/* Streak */}
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.5rem',
//                 background: 'rgba(251, 146, 60, 0.2)',
//                 padding: '0.75rem 1.25rem',
//                 borderRadius: '20px',
//                 border: '2px solid #fb923c'
//               }}
//             >
//               <Flame size={20} color="#fb923c" />
//               <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>
//                 {userStats.streak}
//               </span>
//             </motion.div>

//             {/* Hearts */}
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.5rem',
//                 background: 'rgba(239, 68, 68, 0.2)',
//                 padding: '0.75rem 1.25rem',
//                 borderRadius: '20px',
//                 border: '2px solid #ef4444'
//               }}
//             >
//               <Heart size={20} color="#ef4444" fill="#ef4444" />
//               <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>
//                 {userStats.hearts}
//               </span>
//             </motion.div>

//             {/* XP */}
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.5rem',
//                 background: 'rgba(34, 197, 94, 0.2)',
//                 padding: '0.75rem 1.25rem',
//                 borderRadius: '20px',
//                 border: '2px solid #22c55e'
//               }}
//             >
//               <Trophy size={20} color="#22c55e" />
//               <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>
//                 {userStats.xp} XP
//               </span>
//             </motion.div>
//           </div>
//         </div>

//         {/* Progress bar */}
//         <div style={{
//           maxWidth: '1400px',
//           margin: '1rem auto 0',
//           background: 'rgba(255,255,255,0.1)',
//           height: '8px',
//           borderRadius: '20px',
//           overflow: 'hidden'
//         }}>
//           <motion.div
//             initial={{ width: 0 }}
//             animate={{ width: `${progressPercentage}%` }}
//             transition={{ duration: 1, ease: 'easeOut' }}
//             style={{
//               height: '100%',
//               background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)',
//               borderRadius: '20px'
//             }}
//           />
//         </div>
//       </div>

//       {/* Roadmap Path */}
//       <div style={{
//         maxWidth: '800px',
//         margin: '0 auto',
//         padding: '4rem 2rem',
//         position: 'relative'
//       }}>
//         {/* SVG for connecting paths */}
//         <svg
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             pointerEvents: 'none',
//             zIndex: 0
//           }}
//         >
//           {roadmapData.map((topic, idx) => {
//             if (idx === roadmapData.length - 1) return null;
            
//             const fromY = 200 + idx * 280;
//             const toY = 200 + (idx + 1) * 280;
//             const fromX = idx % 2 === 0 ? 200 : 600;
//             const toX = (idx + 1) % 2 === 0 ? 200 : 600;

//             return (
//               <ConnectionPath
//                 key={`path-${idx}`}
//                 from={{ x: fromX, y: fromY }}
//                 to={{ x: toX, y: toY }}
//                 isActive={topic.status === 'completed'}
//               />
//             );
//           })}
//         </svg>

//         {/* Topic nodes */}
//         <div style={{ position: 'relative', zIndex: 1 }}>
//           {roadmapData.map((topic, idx) => {
//             const isLocked = isTopicLocked(topic);
//             const xPosition = idx % 2 === 0 ? '25%' : '75%';
            
//             return (
//               <div
//                 key={topic.id}
//                 style={{
//                   display: 'flex',
//                   justifyContent: idx % 2 === 0 ? 'flex-start' : 'flex-end',
//                   marginBottom: idx === roadmapData.length - 1 ? 0 : '8rem',
//                   paddingLeft: idx % 2 === 0 ? '10%' : 0,
//                   paddingRight: idx % 2 === 0 ? 0 : '10%'
//                 }}
//               >
//                 <TopicNode
//                   topic={topic}
//                   position={idx}
//                   isLocked={isLocked}
//                   onClick={setSelectedTopic}
//                   pathColor={subject.gradient}
//                 />
//               </div>
//             );
//           })}
//         </div>

//         {/* Completion celebration */}
//         {progressPercentage === 100 && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             style={{
//               background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
//               borderRadius: '24px',
//               padding: '3rem',
//               textAlign: 'center',
//               marginTop: '4rem',
//               boxShadow: '0 20px 60px rgba(34, 197, 94, 0.4)'
//             }}
//           >
//             <Trophy size={64} color="white" style={{ marginBottom: '1rem' }} />
//             <h2 style={{
//               fontSize: '2.5rem',
//               fontWeight: 800,
//               margin: 0,
//               marginBottom: '1rem'
//             }}>
//               🎉 Congratulations!
//             </h2>
//             <p style={{
//               fontSize: '1.25rem',
//               opacity: 0.9,
//               margin: 0
//             }}>
//               You've completed all topics in {subject.title}!
//             </p>
//           </motion.div>
//         )}
//       </div>

//       {/* Topic Detail Modal */}
//       <AnimatePresence>
//         {selectedTopic && (
//           <TopicDetailModal
//             topic={selectedTopic}
//             onClose={() => setSelectedTopic(null)}
//             onStatusChange={handleStatusChange}
//             gradient={subject.gradient}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default DuolingoRoadmap;
// DuolingoRoadmap.jsx - FIXED VERSION
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, Circle, Lock, PlayCircle, Star, Clock, Trophy,
  Target, Zap, Award, TrendingUp, BookOpen, Play, FileText,
  RotateCcw, X, ChevronLeft, Flame, Heart, Shield, ExternalLink,
  Unlock, AlertCircle, Code2, ChevronRight
} from 'lucide-react';

// Practice platforms configuration
const PRACTICE_PLATFORMS = {
  leetcode: {
    name: 'LeetCode',
    color: '#FFA116',
    icon: '💻'
  },
  gfg: {
    name: 'GeeksforGeeks',
    color: '#2F8D46',
    icon: '📚'
  },
  hackerrank: {
    name: 'HackerRank',
    color: '#00EA64',
    icon: '🎯'
  }
};

// Difficulty colors
const DIFFICULTY_COLORS = {
  Easy: { bg: '#dcfce7', text: '#166534', border: '#86efac' },
  Medium: { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
  Hard: { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
  Expert: { bg: '#f3e8ff', text: '#6b21a8', border: '#d8b4fe' }
};

// Status styles
const STATUS_STYLES = {
  'not-started': {
    color: '#94a3b8',
    bg: 'rgba(148, 163, 184, 0.2)',
    label: 'Not Started',
    icon: Circle
  },
  'incomplete': {
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.2)',
    label: 'Incomplete',
    icon: AlertCircle
  },
  'in-progress': {
    color: '#fb923c',
    bg: 'rgba(251, 146, 60, 0.2)',
    label: 'In Progress',
    icon: PlayCircle
  },
  'completed': {
    color: '#22c55e',
    bg: 'rgba(34, 197, 94, 0.2)',
    label: 'Completed',
    icon: CheckCircle2
  }
};

// Icon mapping
const ICON_MAP = {
  Code: Code2,
  Server: Shield,
  Database: BookOpen,
  Network: TrendingUp,
  Box: Target,
  Layers: Award
};

// Enhanced Topic Node Component
const TopicNode = ({ 
  topic, 
  position, 
  isLocked, 
  onClick, 
  pathColor,
  onUnlock 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Safe check for practice problems
  const practiceProblems = topic.practiceProblems || { total: 0, platforms: {} };
  const platforms = practiceProblems.platforms || {};
  const totalProblems = practiceProblems.total || 0;

  // Auto-detect status based on completion
  const getAutoStatus = () => {
    const completed = topic.completedProblems || 0;
    if (completed === 0) {
      return 'not-started';
    } else if (completed >= totalProblems) {
      return 'completed';
    } else {
      return 'incomplete';
    }
  };

  const autoStatus = getAutoStatus();
  const displayStatus = topic.status || autoStatus;
  const statusConfig = STATUS_STYLES[displayStatus];

  const getNodeStyle = () => {
    if (isLocked) {
      return {
        background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
        border: '4px solid #334155',
        icon: Lock,
        iconColor: '#94a3b8',
        shadow: '0 4px 12px rgba(0,0,0,0.3)'
      };
    }
    
    switch (displayStatus) {
      case 'completed':
        return {
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          border: '4px solid #15803d',
          icon: CheckCircle2,
          iconColor: 'white',
          shadow: '0 8px 24px rgba(34, 197, 94, 0.4)'
        };
      case 'incomplete':
        return {
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          border: '4px solid #b45309',
          icon: AlertCircle,
          iconColor: 'white',
          shadow: '0 8px 24px rgba(245, 158, 11, 0.4)'
        };
      case 'in-progress':
        return {
          background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
          border: '4px solid #ea580c',
          icon: PlayCircle,
          iconColor: 'white',
          shadow: '0 8px 24px rgba(251, 146, 60, 0.4)'
        };
      default:
        return {
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          border: '4px solid #4338ca',
          icon: Circle,
          iconColor: 'white',
          shadow: '0 6px 18px rgba(99, 102, 241, 0.4)'
        };
    }
  };

  const nodeStyle = getNodeStyle();
  const NodeIcon = nodeStyle.icon;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ 
        type: 'spring',
        stiffness: 300,
        damping: 25,
        delay: position * 0.1
      }}
      whileHover={{ scale: isLocked ? 1 : 1.15, y: -10 }}
      whileTap={{ scale: isLocked ? 1 : 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => !isLocked && onClick(topic)}
      style={{
        position: 'relative',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        zIndex: isHovered ? 10 : 1
      }}
    >
      {/* Status Badge Above Node */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: position * 0.1 + 0.2 }}
        style={{
          position: 'absolute',
          top: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: statusConfig.bg,
          border: `2px solid ${statusConfig.color}`,
          borderRadius: '20px',
          padding: '0.5rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          whiteSpace: 'nowrap',
          boxShadow: `0 4px 12px ${statusConfig.color}40`,
          backdropFilter: 'blur(10px)'
        }}
      >
        <statusConfig.icon size={14} color={statusConfig.color} />
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: statusConfig.color,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {statusConfig.label}
        </span>
      </motion.div>

      {/* Unlock Button for Locked Topics */}
      {isLocked && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onUnlock(topic.id);
          }}
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            borderRadius: '50%',
            padding: '10px',
            border: '3px solid white',
            boxShadow: '0 4px 16px rgba(99, 102, 241, 0.6)',
            cursor: 'pointer',
            zIndex: 3
          }}
          title="Skip prerequisites and unlock"
        >
          <Unlock size={18} color="white" />
        </motion.button>
      )}

      {/* Revisit indicator */}
      {topic.needsRevisit && !isLocked && (
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            background: 'linear-gradient(135deg, #fb923c 0%, #f59e0b 100%)',
            borderRadius: '50%',
            padding: '8px',
            boxShadow: '0 0 25px rgba(251, 146, 60, 0.8)',
            border: '3px solid white',
            zIndex: 2
          }}
        >
          <RotateCcw size={18} color="white" />
        </motion.div>
      )}

      {/* Importance Star */}
      {!isLocked && topic.importance === 5 && (
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [0, 15, 0, -15, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            top: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#fbbf24',
            borderRadius: '50%',
            padding: '8px',
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.8)',
            border: '3px solid white',
            zIndex: 2
          }}
        >
          <Star size={16} fill="#fbbf24" color="white" />
        </motion.div>
      )}

      {/* Main node circle */}
      <motion.div
        animate={{
          boxShadow: isHovered && !isLocked 
            ? ['0 8px 24px rgba(99, 102, 241, 0.4)', '0 20px 50px rgba(99, 102, 241, 0.8)']
            : nodeStyle.shadow
        }}
        transition={{ duration: 0.3 }}
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: nodeStyle.background,
          border: nodeStyle.border,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxShadow: nodeStyle.shadow
        }}
      >
        <NodeIcon size={50} color={nodeStyle.iconColor} />
        
        {/* Progress Ring for Incomplete */}
        {displayStatus === 'incomplete' && topic.completedProblems > 0 && (
          <svg style={{ position: 'absolute', width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <circle
              cx="60"
              cy="60"
              r="56"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="4"
              fill="none"
            />
            <motion.circle
              cx="60"
              cy="60"
              r="56"
              stroke="#fbbf24"
              strokeWidth="4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: topic.completedProblems / totalProblems }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              strokeDasharray={2 * Math.PI * 56}
            />
          </svg>
        )}
      </motion.div>

      {/* Topic label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: position * 0.1 + 0.3 }}
        style={{
          marginTop: '1.2rem',
          textAlign: 'center',
          maxWidth: '160px'
        }}
      >
        <p style={{
          fontSize: '1.05rem',
          fontWeight: 700,
          color: 'white',
          margin: 0,
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          marginBottom: '0.5rem'
        }}>
          {topic.name}
        </p>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'center',
          marginTop: '0.5rem',
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.7)'
        }}>
          <span style={{ fontWeight: 600 }}>{topic.difficulty}</span>
          <span>•</span>
          <span>{topic.duration.split('-')[0]}</span>
        </div>

        {/* Problem completion indicator */}
        {topic.completedProblems > 0 && (
          <div style={{
            marginTop: '0.5rem',
            background: displayStatus === 'completed' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(245, 158, 11, 0.3)',
            border: `1px solid ${displayStatus === 'completed' ? '#22c55e' : '#f59e0b'}`,
            borderRadius: '12px',
            padding: '0.25rem 0.75rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: displayStatus === 'completed' ? '#22c55e' : '#f59e0b'
          }}>
            {topic.completedProblems}/{totalProblems} solved
          </div>
        )}
      </motion.div>

      {/* Enhanced Hover Tooltip */}
      <AnimatePresence>
        {isHovered && !isLocked && Object.keys(platforms).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            style={{
              position: 'absolute',
              top: '140%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(15, 23, 42, 0.98)',
              backdropFilter: 'blur(20px)',
              padding: '1.5rem',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.2)',
              minWidth: '320px',
              zIndex: 20,
              boxShadow: '0 16px 48px rgba(0,0,0,0.6)'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.75rem'
            }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < topic.importance ? '#fbbf24' : 'none'}
                  color={i < topic.importance ? '#fbbf24' : '#64748b'}
                />
              ))}
              <span style={{
                fontSize: '0.875rem',
                color: '#fbbf24',
                fontWeight: 600,
                marginLeft: '0.25rem'
              }}>
                {topic.importance === 5 ? 'Critical' : 'Important'}
              </span>
            </div>

            <p style={{
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.9)',
              margin: '0 0 1rem 0',
              lineHeight: '1.5'
            }}>
              {totalProblems} practice problems across platforms
            </p>

            {/* Platform links */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {Object.entries(platforms).map(([platform, data]) => (
                <motion.a
                  key={platform}
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, x: 5 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    background: `${PRACTICE_PLATFORMS[platform].color}20`,
                    borderRadius: '12px',
                    textDecoration: 'none',
                    border: `1px solid ${PRACTICE_PLATFORMS[platform].color}40`,
                    transition: 'all 0.3s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>{PRACTICE_PLATFORMS[platform].icon}</span>
                    <div>
                      <div style={{
                        color: PRACTICE_PLATFORMS[platform].color,
                        fontWeight: 600,
                        fontSize: '0.875rem'
                      }}>
                        {PRACTICE_PLATFORMS[platform].name}
                      </div>
                      <div style={{
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: '0.75rem'
                      }}>
                        {data.count} problems
                      </div>
                    </div>
                  </div>
                  <ExternalLink size={16} color={PRACTICE_PLATFORMS[platform].color} />
                </motion.a>
              ))}
            </div>

            <p style={{
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.5)',
              margin: '1rem 0 0 0',
              textAlign: 'center'
            }}>
              Click to view full details
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Connection Path Component
const ConnectionPath = ({ from, to, isActive }) => {
  return (
    <motion.path
      d={`M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${(from.y + to.y) / 2 + 50} ${to.x} ${to.y}`}
      stroke={isActive ? '#22c55e' : '#334155'}
      strokeWidth={isActive ? 8 : 4}
      strokeLinecap="round"
      strokeDasharray={isActive ? '0' : '10,5'}
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      style={{
        filter: isActive ? 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.6))' : 'none'
      }}
    />
  );
};

// Topic Detail Modal Component
const TopicDetailModal = ({ topic, onClose, onStatusChange, gradient }) => {
  const difficultyStyle = DIFFICULTY_COLORS[topic.difficulty];
  const practiceProblems = topic.practiceProblems || { total: 0, platforms: {} };
  const platforms = practiceProblems.platforms || {};
  const totalProblems = practiceProblems.total || 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '2rem'
      }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '24px',
          maxWidth: '700px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.4)'
        }}
      >
        {/* Header */}
        <div style={{
          background: gradient,
          padding: '2rem',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          position: 'relative'
        }}>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)'
            }}
          >
            <X size={20} color="white" />
          </motion.button>

          <h2 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: 'white',
            margin: 0,
            marginBottom: '1rem',
            paddingRight: '3rem'
          }}>
            {topic.name}
          </h2>

          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <span style={{
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              background: difficultyStyle.bg,
              color: difficultyStyle.text,
              fontWeight: 600,
              fontSize: '0.875rem',
              border: `2px solid ${difficultyStyle.border}`
            }}>
              {topic.difficulty}
            </span>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '20px'
            }}>
              <Clock size={16} />
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                {topic.duration}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < topic.importance ? '#fbbf24' : 'none'}
                  color={i < topic.importance ? '#fbbf24' : 'rgba(255,255,255,0.4)'}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '2rem' }}>
          {/* Practice Problems Section */}
          {Object.keys(platforms).length > 0 && (
            <div style={{
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '16px',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <Code2 size={24} color="#6366f1" />
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'white',
                    margin: 0
                  }}>
                    Practice Problems
                  </h3>
                </div>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#6366f1'
                }}>
                  {totalProblems} problems
                </span>
              </div>

              {/* Platform Links */}
              <div style={{
                display: 'grid',
                gap: '0.75rem'
              }}>
                {Object.entries(platforms).map(([platform, data]) => (
                  <motion.a
                    key={platform}
                    href={data.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, x: 5 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem 1.25rem',
                      background: `${PRACTICE_PLATFORMS[platform].color}15`,
                      borderRadius: '12px',
                      textDecoration: 'none',
                      border: `2px solid ${PRACTICE_PLATFORMS[platform].color}40`,
                      transition: 'all 0.3s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{PRACTICE_PLATFORMS[platform].icon}</span>
                      <div>
                        <div style={{
                          color: PRACTICE_PLATFORMS[platform].color,
                          fontWeight: 700,
                          fontSize: '1rem'
                        }}>
                          {PRACTICE_PLATFORMS[platform].name}
                        </div>
                        <div style={{
                          color: 'rgba(255,255,255,0.6)',
                          fontSize: '0.85rem'
                        }}>
                          {data.count} problems • {data.topics}
                        </div>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: PRACTICE_PLATFORMS[platform].color
                    }}>
                      <span style={{ fontWeight: 600 }}>Solve</span>
                      <ExternalLink size={18} />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          )}

          {/* Status Change Buttons */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '1rem'
            }}>
              Update Status:
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem'
            }}>
              {['not-started', 'in-progress', 'completed'].map((status) => {
                const isActive = topic.status === status;
                const colors = {
                  'not-started': '#94a3b8',
                  'in-progress': '#fb923c',
                  'completed': '#22c55e'
                };
                
                return (
                  <motion.button
                    key={status}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onStatusChange(topic.id, status)}
                    style={{
                      padding: '0.875rem',
                      borderRadius: '12px',
                      border: `2px solid ${isActive ? colors[status] : 'rgba(255,255,255,0.1)'}`,
                      background: isActive 
                        ? `${colors[status]}20`
                        : 'rgba(255,255,255,0.05)',
                      color: isActive ? colors[status] : 'rgba(255,255,255,0.6)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      transition: 'all 0.3s'
                    }}
                  >
                    {status.replace('-', ' ')}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Revisit Toggle */}
          <div style={{
            background: topic.needsRevisit 
              ? 'rgba(251, 146, 60, 0.1)'
              : 'rgba(255,255,255,0.05)',
            border: `2px solid ${topic.needsRevisit ? '#fb923c' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '16px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <RotateCcw size={24} color={topic.needsRevisit ? '#fb923c' : '#94a3b8'} />
                <div>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'white',
                    margin: 0
                  }}>
                    Mark for Revision
                  </h4>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.6)',
                    margin: '0.25rem 0 0 0'
                  }}>
                    {topic.needsRevisit ? 'Marked for review' : 'Mark this topic to revisit later'}
                  </p>
                </div>
              </div>
              
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => onStatusChange(topic.id, null, !topic.needsRevisit)}
                style={{
                  width: '56px',
                  height: '32px',
                  borderRadius: '16px',
                  background: topic.needsRevisit 
                    ? 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)'
                    : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s'
                }}
              >
                <motion.div
                  animate={{
                    x: topic.needsRevisit ? 24 : 0
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: '2px',
                    left: '2px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                  }}
                />
              </motion.button>
            </div>
          </div>

          {/* Resource Links */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
          }}>
            <motion.a
              href={topic.youtube}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.25rem',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
                justifyContent: 'center'
              }}
            >
              <Play size={20} />
              <span>Watch Video</span>
            </motion.a>

            <motion.a
              href={topic.material}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.25rem',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                justifyContent: 'center'
              }}
            >
              <FileText size={20} />
              <span>Read Material</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Duolingo Roadmap Component
function DuolingoRoadmap({ subject, onBack }) {
  const [roadmapData, setRoadmapData] = useState(subject.roadmap || []);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [userStats, setUserStats] = useState({
    streak: 7,
    hearts: 5,
    xp: 1250
  });

  const completedCount = roadmapData.filter(t => t.status === 'completed').length;
  const progressPercentage = roadmapData.length > 0 ? (completedCount / roadmapData.length) * 100 : 0;

  const isTopicLocked = (topic) => {
    if (!topic.prerequisites || topic.prerequisites.length === 0) return false;
    return !topic.prerequisites.every(preReqId => {
      const preReqTopic = roadmapData.find(t => t.id === preReqId);
      return preReqTopic && preReqTopic.status === 'completed';
    });
  };

  const handleUnlockTopic = (topicId) => {
    setRoadmapData(prev => prev.map(topic => 
      topic.id === topicId ? { ...topic, prerequisites: [] } : topic
    ));
  };

  const handleStatusChange = (topicId, newStatus, toggleRevisit = null) => {
    setRoadmapData(prev => prev.map(topic => {
      if (topic.id === topicId) {
        const updates = {};
        if (newStatus !== null) updates.status = newStatus;
        if (toggleRevisit !== null) updates.needsRevisit = toggleRevisit;
        return { ...topic, ...updates };
      }
      return topic;
    }));
    
    if (selectedTopic && selectedTopic.id === topicId) {
      setSelectedTopic(prev => ({
        ...prev,
        status: newStatus !== null ? newStatus : prev.status,
        needsRevisit: toggleRevisit !== null ? toggleRevisit : prev.needsRevisit
      }));
    }
  };

  const IconComponent = subject.iconName && ICON_MAP[subject.iconName] ? ICON_MAP[subject.iconName] : Code2;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.05,
        pointerEvents: 'none'
      }}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: subject.gradient
            }}
          />
        ))}
      </div>

      {/* Top Navigation Bar */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(15px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          {/* Back button and title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              <ChevronLeft size={20} />
              <span>Back</span>
            </motion.button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                background: subject.gradient,
                padding: '0.75rem',
                borderRadius: '12px'
              }}>
                <IconComponent size={24} />
              </div>
              <div>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  margin: 0
                }}>
                  {subject.title}
                </h2>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.6)',
                  margin: 0
                }}>
                  {completedCount} of {roadmapData.length} completed
                </p>
              </div>
            </div>
          </div>

          {/* User stats */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center'
          }}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(251, 146, 60, 0.2)',
                padding: '0.75rem 1.25rem',
                borderRadius: '20px',
                border: '2px solid #fb923c'
              }}
            >
              <Flame size={20} color="#fb923c" />
              <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                {userStats.streak}
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(239, 68, 68, 0.2)',
                padding: '0.75rem 1.25rem',
                borderRadius: '20px',
                border: '2px solid #ef4444'
              }}
            >
              <Heart size={20} color="#ef4444" fill="#ef4444" />
              <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                {userStats.hearts}
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(34, 197, 94, 0.2)',
                padding: '0.75rem 1.25rem',
                borderRadius: '20px',
                border: '2px solid #22c55e'
              }}
            >
              <Trophy size={20} color="#22c55e" />
              <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                {userStats.xp} XP
              </span>
            </motion.div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          maxWidth: '1400px',
          margin: '1rem auto 0',
          background: 'rgba(255,255,255,0.1)',
          height: '10px',
          borderRadius: '20px',
          overflow: 'hidden'
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)',
              borderRadius: '20px',
              boxShadow: '0 0 15px rgba(34, 197, 94, 0.6)'
            }}
          />
        </div>
      </div>

      {/* Roadmap Path */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '4rem 2rem',
        position: 'relative'
      }}>
        {/* SVG for connecting paths */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0
          }}
        >
          {roadmapData.map((topic, idx) => {
            if (idx === roadmapData.length - 1) return null;
            
            const fromY = 200 + idx * 300;
            const toY = 200 + (idx + 1) * 300;
            const fromX = idx % 2 === 0 ? 200 : 600;
            const toX = (idx + 1) % 2 === 0 ? 200 : 600;

            return (
              <ConnectionPath
                key={`path-${idx}`}
                from={{ x: fromX, y: fromY }}
                to={{ x: toX, y: toY }}
                isActive={topic.status === 'completed'}
              />
            );
          })}
        </svg>

        {/* Topic nodes */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {roadmapData.map((topic, idx) => {
            const isLocked = isTopicLocked(topic);
            
            return (
              <div
                key={topic.id}
                style={{
                  display: 'flex',
                  justifyContent: idx % 2 === 0 ? 'flex-start' : 'flex-end',
                  marginBottom: idx === roadmapData.length - 1 ? 0 : '9rem',
                  paddingLeft: idx % 2 === 0 ? '10%' : 0,
                  paddingRight: idx % 2 === 0 ? 0 : '10%'
                }}
              >
                <TopicNode
                  topic={topic}
                  position={idx}
                  isLocked={isLocked}
                  onClick={setSelectedTopic}
                  pathColor={subject.gradient}
                  onUnlock={handleUnlockTopic}
                />
              </div>
            );
          })}
        </div>

        {/* Completion celebration */}
        {progressPercentage === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              borderRadius: '24px',
              padding: '3rem',
              textAlign: 'center',
              marginTop: '4rem',
              boxShadow: '0 20px 60px rgba(34, 197, 94, 0.5)'
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Trophy size={80} color="white" style={{ marginBottom: '1rem' }} />
            </motion.div>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              margin: 0,
              marginBottom: '1rem'
            }}>
              🎉 Congratulations!
            </h2>
            <p style={{
              fontSize: '1.25rem',
              opacity: 0.9,
              margin: 0
            }}>
              You've completed all topics in {subject.title}!
            </p>
          </motion.div>
        )}
      </div>

      {/* Topic Detail Modal */}
      <AnimatePresence>
        {selectedTopic && (
          <TopicDetailModal
            topic={selectedTopic}
            onClose={() => setSelectedTopic(null)}
            onStatusChange={handleStatusChange}
            gradient={subject.gradient}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default DuolingoRoadmap;
