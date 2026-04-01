/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode, useState, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Github, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Code2, 
  Database, 
  Layout, 
  Cpu, 
  Trophy, 
  Languages, 
  GraduationCap,
  User,
  FileText,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";

const Lightbox = ({ image, onClose }: { image: string | null; onClose: () => void }) => (
  <AnimatePresence>
    {image && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
      >
        <motion.button
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 text-white hover:bg-orange-500 transition-colors"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
        >
          <X className="w-6 h-6" />
        </motion.button>
        
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          src={image}
          alt="Full size"
          className="max-w-full max-h-full object-contain rounded-sm shadow-2xl shadow-orange-500/10"
          onClick={(e) => e.stopPropagation()}
          referrerPolicy="no-referrer"
        />
      </motion.div>
    )}
  </AnimatePresence>
);

const Section = ({ title, icon: Icon, children }: { title: string; icon: any; children: ReactNode }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-12"
  >
    <div className="flex items-center gap-2 mb-6 border-b border-zinc-800 pb-2">
      <Icon className="w-5 h-5 text-orange-500" />
      <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-400">{title}</h2>
    </div>
    {children}
  </motion.section>
);

const FeatureCard = ({ title, type, year, description, tech, images, onImageClick, link, webLink }: { title: string; type: string; year: string; description: string; tech: string; images?: string[]; onImageClick: (img: string) => void; link?: string; webLink?: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for right, -1 for left

  const nextImage = (e: MouseEvent) => {
    e.stopPropagation();
    if (images) {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = (e: MouseEvent) => {
    e.stopPropagation();
    if (images) {
      setDirection(-1);
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group border border-zinc-800 hover:bg-zinc-900/50 transition-all duration-300 rounded-sm overflow-hidden flex flex-col bg-zinc-900/20"
    >
      {images && images.length > 0 && (
        <div 
          className="w-full aspect-video overflow-hidden border-b border-zinc-800 relative group/carousel bg-zinc-950 cursor-zoom-in"
          onClick={() => onImageClick(images[currentIndex])}
        >
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.img 
              key={currentIndex}
              src={images[currentIndex]} 
              alt={`${title} - image ${currentIndex + 1}`} 
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ 
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          
          {images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-orange-500"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-orange-500"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-orange-50 bg-orange-500 w-3' : 'bg-white/30'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-medium text-zinc-100 group-hover:text-orange-500 transition-colors">{title}</h3>
          <span className="text-xs font-mono text-zinc-500">{year}</span>
        </div>
        <p className="text-xs font-mono text-orange-500/80 mb-4 uppercase tracking-tighter">{type}</p>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1">{description}</p>
        <div className="flex items-center justify-between gap-2 text-xs font-mono text-zinc-600 mt-auto pt-4 border-t border-zinc-800/50">
          <div className="flex items-center gap-2">
            <Code2 className="w-3 h-3" />
            <span>{tech}</span>
          </div>
          <div className="flex items-center gap-2">
            {link && (
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-orange-500 text-black px-2 py-1 rounded-sm hover:bg-orange-400 transition-colors font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                <span>View Figma</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {webLink && (
              <a 
                href={webLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-zinc-800 text-zinc-100 px-2 py-1 rounded-sm hover:bg-zinc-700 transition-colors font-medium border border-zinc-700"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Go to Web</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const contactInfo = [
    { icon: MapPin, text: "Khlong Luang, Pathumthani, 12120" },
    { icon: Phone, text: "(+66) 93-356-3306" },
    { icon: Mail, text: "nattakritsiripap@gmail.com" },
    { icon: Github, text: "github.com/Rangnarz", link: "https://github.com/Rangnarz" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-300 font-sans selection:bg-orange-500/30 selection:text-orange-200">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        {/* Header */}
        <header className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row gap-8 items-start md:items-center"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-800 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img 
                src="https://scontent.cdninstagram.com/v/t1.15752-9/658973388_939725948838241_7411599206844156171_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=108&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=A8cT0tQ2ReIQ7kNvwHDUnh4&_nc_oc=Adqx52a6wExYRXtzaRwZOKffizco5gRF9VulzQBMlVsNTl2cCImvW_yfKXpCCk1oWrJjowxtAALgQCL3vl3RQzjz&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AEHDs6Kcdn_7z5P70Fg5SuWM8eZdLcGNUG_NgeaTT_75w&oe=69F47341" 
                alt="Nattakit Siripap" 
                className="relative w-32 h-32 rounded-full object-cover border-2 border-zinc-800"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-2">
                NATTAKRIT <span className="text-orange-500">SIRIPAP</span>
              </h1>
              <p className="text-lg font-mono text-zinc-500 uppercase tracking-[0.2em]">
                Computer Science Student
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10"
          >
            {contactInfo.map((info, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                <info.icon className="w-4 h-4 text-orange-500/60" />
                {info.link ? (
                  <a href={info.link} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                    {info.text} <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span>{info.text}</span>
                )}
              </div>
            ))}
          </motion.div>
        </header>

        {/* About Me */}
        <Section title="About Me" icon={User}>
          <p className="text-lg leading-relaxed text-zinc-400 max-w-2xl italic font-serif">
            "I am currently a Computer Science student with a keen interest in Web applications. 
            Having acquired a foundational understanding of these fields through my coursework, 
            I am eager to apply this knowledge to a practical project."
          </p>
        </Section>

        {/* Education */}
        <Section title="Education" icon={GraduationCap}>
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h3 className="text-xl font-medium text-zinc-100">Rajamangala University of Technology Thanyaburi</h3>
              <p className="text-zinc-400">Bachelor of Science in Computer Science</p>
              <div className="mt-2 flex items-center gap-3">
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-orange-500 text-xs font-mono rounded">GPAX: 3.65</span>
                <a 
                  href="/Nattakrit_transcript.pdf" 
                 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2 py-0.5 bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-mono rounded hover:bg-orange-500/20 transition-colors group"
                >
                  <FileText className="w-3 h-3" />
                  <span>Transcript</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono text-zinc-500">2023 — 2027</p>
              <p className="text-xs font-mono text-orange-500/60 uppercase tracking-wider">(Expected)</p>
            </div>
          </div>
        </Section>

        {/* Projects */}
        <Section title="Projects" icon={Cpu}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard 
              title="GUHAVECPU"
              type="Web Application"
              year="2025"
              description="An online e-commerce platform for computer parts and gadgets. Features a robust product catalog and seamless user experience."
              tech="Angular Framework • SQL Database"
              onImageClick={setSelectedImage}
              images={[
                "https://scontent.cdninstagram.com/v/t1.15752-9/657740900_1546686417457404_3194780402905993666_n.png?_nc_cat=111&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=5Z7LVIHSH8QQ7kNvwFqPrdY&_nc_oc=Adr8Y0KD3EwDalmcrLp2KmoH6diVLxREkC6-FzSgz_q6klkYOGKLhZr-N_FiUf7ScrZ73jYcoiLJ_xibXEV5mFu6&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AHU_X5zJn8odCWaxiHuEvQCQHEd9M-vPPOZtjorBMgx4w&oe=69F453AA",
                "https://scontent.cdninstagram.com/v/t1.15752-9/661966035_35554408127479507_7435886285542225021_n.png?_nc_cat=103&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=d0S29q0QYvMQ7kNvwHNHCao&_nc_oc=AdqOwQ7GLHoBYZfni-b5vv3t0vt2yyQrbgskxg4fgKcghj7cklv2b5X6jiFRf7RSxnH-91pq-pWG0BD-ZyMnPqLt&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AHUn65CQq0jaTPuqfDd6kmgOojybP8qt90IPb6oj4bm8Q&oe=69F45288",
                "https://scontent.cdninstagram.com/v/t1.15752-9/659782775_962365602800279_3806605312384909181_n.png?_nc_cat=104&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=0MLhZ051SF8Q7kNvwGWSDF9&_nc_oc=AdqiSL6FmX7P-E3Uw5tMEM8CngC_zoEIe06_PZSWBw8uQQPaH6JDT-DAg6fwq5a75nODAV4-TSn8qdXIOl9SnnHP&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AGJPq9h-kLxzhOWjmaWNjZi_VaNTdzfMy7yIFnukcNW-A&oe=69F4798F",
                "https://scontent.cdninstagram.com/v/t1.15752-9/659077656_1853969975318625_3264419975457113667_n.png?_nc_cat=103&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=w1UiVaWXfYIQ7kNvwGyRWya&_nc_oc=AdpUihlcgTUq9TMT1eeyIJcY3rnJLX1C3qEP6EqqqBVVn7GggK-uuRq5QK6w2oyS0hRqzxrdnGJP15poM3U5jeWk&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AFxU-K1hVCDOKCMeG-F_8Uc1CMG9_lkfADQb-8Hq8S8ow&oe=69F45869",
                "https://scontent.cdninstagram.com/v/t1.15752-9/657579431_1510213840448590_1328265619169953717_n.png?_nc_cat=106&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=wL_ZIxUMGckQ7kNvwGcXSHO&_nc_oc=AdpzVV_IuvfAtErdffVFdVmULtZ0Y6mnYfYnBvzqle_zfRSp46KuhmCh5Gca23mrUUktDw7sqkUV-PYNCHWDCOCy&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AGQzXezew3HZnoHHXngt6K4TCPzhrVulA47K0fz6v3XNw&oe=69F45D93"
              ]}
            />
            
            <FeatureCard 
              title="RMUTT Oreg"
              type="UX/UI Design"
              year="2025"
              description="Redesigned the student registration system from a website format to a minimalist mobile app design focused on usability."
              tech="Figma • Mobile Design Language"
              onImageClick={setSelectedImage}
              link="https://www.figma.com/design/1O6X2Z2Nh5iJnSXQG4eHY9/HCI---OREG-Final-UX-UI?node-id=0-1&t=rSZ95cMnAq143nLE-1"
              images={[
                "https://scontent.cdninstagram.com/v/t1.15752-9/657993354_933842922566593_8488991856017825736_n.png?_nc_cat=101&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=950BSiL2OxMQ7kNvwEkUygH&_nc_oc=AdrE1Os9norR1hdwl9QAjRXEQmGJFszEiGqI_Q37upKhd7d0C9ACSnLW9KyHS3GvOFK9eGmO8z060aePCFnrfA9y&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AHCz-2JZd6RRQoQLrAHhxh-2-ijw4EOtE24y0jULz8QFw&oe=69F45B07",
                "https://scontent.cdninstagram.com/v/t1.15752-9/662362555_1660292291775850_3612125043419443860_n.png?_nc_cat=107&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=3Lw5lQPjgJ4Q7kNvwEzbwzu&_nc_oc=AdoG1fUIPHFULMgikwvH5VEClt99mhGnUm9jOQDBMJk0H58M6emPNREiwnPdKE8zI_g5u4U2FNcK1mbGh5MceIJ5&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AHoMp33Ykcmg3uW6z27TPTaFfBi8aR_dlI2JK0XCN0Oww&oe=69F460BD",
                "https://scontent.cdninstagram.com/v/t1.15752-9/658317429_927984160089578_6646009905889427549_n.png?_nc_cat=110&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=9p2KrNzeAQoQ7kNvwGVJmFl&_nc_oc=Adqe9cbRFzGuaSkD56T5HVrH1nP2WTBjD72l2euQ5sPeZQYXgWnezU1t41Q9lYJguO_jrZZ5caY8dRcD6v0yPE49&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AHpbpmJOPD-f7S30JPXQW9fjXjQ_ieldm7_ly2wcV4sfw&oe=69F458B7"
              ]}
            />
            <FeatureCard 
              title="MONEYSAVER"
              type="Web Application"
              year="2025"
              description="A bookkeeping application enabling users to record daily transactions and categorize expenditures with automated monthly summaries."
              tech="Web Technologies • Data Aggregation"
              onImageClick={setSelectedImage}
              webLink="https://accountment.vercel.app/"
              images={[
                "https://scontent.cdninstagram.com/v/t1.15752-9/657723826_2805895259747379_7962174771074412038_n.png?_nc_cat=106&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=NmblC8lHEuUQ7kNvwH6RN3B&_nc_oc=AdqhrpvxL7GYpRdZrPCrgq_ftBAR8tZVwYWQ5rUG8VJWBcN6WsbIIPm8t6Z5acqJKlqCfRSnjeQRxh99iqUMl12z&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AFmC2brvNJpe-WAH5fV502QQ9pOfy6HIAySSBzGcv6idw&oe=69F456C5",
                "https://scontent.cdninstagram.com/v/t1.15752-9/655890672_26611148851906088_2894426306502819944_n.png?_nc_cat=110&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=lKCetNDbeC8Q7kNvwFZ30bW&_nc_oc=Adou2uXnOl7yRKu2b5I184yAx4FPh1COW3HDEEECBsLxmpkgV70aoEuM-JxvT6XgtpbD6MiXBGlsNXcT4QVHN3YF&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AE2rxBDN_vPNwvCeDPj2-3BrQO522j-dpUcWqTPlkBPBw&oe=69F46A9D",
                "https://scontent.cdninstagram.com/v/t1.15752-9/662340792_1558702835198546_1098508204257509727_n.png?_nc_cat=105&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=XWsy57yEOGEQ7kNvwGGpXqe&_nc_oc=AdqN5Mt4hfi7_sLvS28ZcG5ibT6eHBWyRzIQzcqaXQuerqf19AfUOrxOPtWqifxrbjzd4IDUrAv9UXNYPkdpdvJ5&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AGFkQeStLTLt0_JYHDuSOKMM-pCYjSlIGz5Jfc_eZZC5w&oe=69F4748A"
              ]}
            />
            <FeatureCard 
              title="SMARTHOME"
              type="Java Application"
              year="2024"
              description="A simulation of a smart home control center. Manages connected devices, schedules timings, and monitors real-time status."
              tech="Java • Device Simulation"
              onImageClick={setSelectedImage}
              images={[
                "https://scontent.cdninstagram.com/v/t1.15752-9/661326096_1670647564089514_3786696030225925717_n.png?_nc_cat=110&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=tCBd9W7MWmAQ7kNvwFE533k&_nc_oc=AdoGspzz5In__W5UjMm_RQJEkCx9iCQi3cmwFF5cLR482UmQJsg8Y8eVx4bdFY42QcMmOa8Sdw98d08eVV4GUt4b&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AEUJBAp1UYF3j302TT4op2geggrBUscrleMSLBQ8M_klg&oe=69F47D37",
                "https://scontent.cdninstagram.com/v/t1.15752-9/664383238_2110598239797257_1476437869238689827_n.png?_nc_cat=108&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=EXjhiKgJMHYQ7kNvwGFYV4x&_nc_oc=AdqZa1ezhCluewEvAijbsQdnt3pxrqnbY7do9Jin9MtfeKt026bEMwzPoFA_RStJ2P9sA36S8dBZJPvewfnrVQe_&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AFDV3WhlZx8-RW0bmRaZ_MmWB5he63YP308sxZ0b-LZxQ&oe=69F48121",
                "https://scontent.cdninstagram.com/v/t1.15752-9/658696378_825945856534470_3968680716871058287_n.png?_nc_cat=107&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=dQL5plsqhtcQ7kNvwE7W5Fy&_nc_oc=AdoG733NJiTABc8bwhCS32m2L4yXL1ijcdWQobAXrTTWNJKCqXh02OkDcWkXHT6bCABsnjfsC2kTBvHAz0gOTnaw&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AFCQZCfM7T6-o5cGl2f6VBO24U8i3_5Rcnba7OajkChNg&oe=69F47E88"
              ]}
            />
          </div>
        </Section>

        {/* Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Section title="Technical Skills" icon={Code2}>
            <div className="flex flex-wrap gap-2">
              {["Python", "SQL", "Java", "HTML", "CSS", "JS"].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-mono rounded-sm hover:border-orange-500/50 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </Section>
          <Section title="Soft Skills" icon={Layout}>
            <ul className="space-y-2 text-sm text-zinc-400 font-mono">
              <li>• Growth Mindset</li>
              <li>• Self-driven Learning</li>
              <li>• Critical Thinking</li>
              <li>• Active Listening</li>
              <li>• Cross-functional Teamwork</li>
            </ul>
          </Section>
        </div>

        {/* Activity */}
        <Section title="Activity" icon={Trophy}>
          <div className="max-w-2xl">
            <FeatureCard 
              title="MOS World Championship 2025"
              type="Global Competition"
              year="2025"
              description="Represented Thailand in the MOS World Championship held in the United States. Achieved 6th place globally in Microsoft Word 2019, demonstrating advanced proficiency in office productivity software on a world stage."
              tech="Microsoft Word • Global Competition"
              onImageClick={setSelectedImage}
              images={[
                "https://scontent.cdninstagram.com/v/t1.15752-9/658405978_958079889961678_3756349240757014429_n.png?_nc_cat=101&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=pje-4zUyUkcQ7kNvwHLSsuJ&_nc_oc=Adr7Ult5t411zzcVyM2fe494iVP555eCIhoHxZ_l_P4I-1oZ_M8Jjz9zv118XriylpEOLIQUv9dpQnZj_aGE8S3b&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AGi-njxpnz9HvkwzEWmldwvUZzI7BL-WFbXvWzgbMa49g&oe=69F47BC9",
                "https://scontent.cdninstagram.com/v/t1.15752-9/657673747_1306971571481346_483014432324266912_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=100&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=sHJRCAGI7WsQ7kNvwGPAWQj&_nc_oc=AdqzFYkUWIqZJlPZaAeqf5WdUHRToHiOP6SRENBqrpsOylTHuFLZHJahawBrlvfa2qO_SQN5r39wdGgpVMOFXZhD&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AEZhudWzX45MxJE2mx7EV_LdYXIRxjMY2-LQjvOFd475A&oe=69F48776",
                "https://scontent.cdninstagram.com/v/t1.15752-9/662610819_797648576301670_1365630024931542526_n.png?_nc_cat=101&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=Pvtzzj96yfEQ7kNvwHnyLUe&_nc_oc=Adpf1V-6LSWSEvvvlvXYbw-p52iT-XD3v9Z5BOzojteTP6XxR2V6hP2eAhg5Wd1aj7_vxS-aeuMmvi-QCQedUwYA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AFxFNJMthirTV0c-IwdJyt01t1Zu3NdyZqAN0-299rHqQ&oe=69F47A55",
                "https://scontent.cdninstagram.com/v/t1.15752-9/656398159_1619041359302384_1649881446637800838_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=103&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=5jM370ixDTwQ7kNvwGvHLmu&_nc_oc=AdoYxoiUwwBgjGBaW9c3qdRFLHe5ZZbR0AyTwWQmAbG1Ik2suKHu10JBuJG-PLCy02tyLqIOS3iswLaxY8-YvxCG&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AGPU3F90kS0ZWsGyjXEe75ejRECDS3CQKjsTWqDJtMA9g&oe=69F48742",
                "https://scontent.cdninstagram.com/v/t1.15752-9/658891880_962819999519201_3677017483303818887_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=100&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=vTLS49uOG-YQ7kNvwFWp3sD&_nc_oc=AdrrDvaa4WQg3nwIyEHxl30DdaQQC3MbK8rHnZIW2xpGUbXljWdX9OctZpaxl1_htd0XSA3m7y35vRUM13DicFtD&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_ss=7a32e&oh=03_Q7cD5AEU8KMhqqvsQkRB15Ce9KMb-wySb6HUi3JlnlRlcIeh0w&oe=69F483DA",
                "https://scontent.fbkk5-7.fna.fbcdn.net/v/t39.30808-6/526571953_1317635950370308_9217781551704063819_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=b895b5&_nc_eui2=AeEh_I_jZIoYJqVVzI_BoncEGa1c-7XXr6YZrVz7tdevplnASjFDUUHLA9vaWMpFiGSSq5b4QW3sZYy_Lsv1ZN_R&_nc_ohc=dQK31jSrPJYQ7kNvwE4zqRA&_nc_oc=AdrgLDV-1647n8pnbdkR56dg47uYUE9JTbO_q-YH3fxQkJECr5cUmOC9yECvhbV8ZEvn5qSrS13tKSCECqhVreNj&_nc_zt=23&_nc_ht=scontent.fbkk5-7.fna&_nc_gid=FUFwKz5EdV1cyOxXxqFCtQ&_nc_ss=7a3a8&oh=00_Af3kS2fp9trQC2s56F3fMjHkV3DfKilTxst0wZcieQVXTw&oe=69D2E324"
              ]}
            />
          </div>
        </Section>

        {/* Languages */}
        <Section title="Languages" icon={Languages}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-sm">
              <p className="text-sm font-medium text-zinc-100 mb-1">English</p>
              <p className="text-xs text-zinc-500">Professional Working Proficiency</p>
              <p className="text-base font-mono font-bold text-orange-500/60 mt-2">TOEIC Score: 645</p>
            </div>
            <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-sm">
              <p className="text-sm font-medium text-zinc-100 mb-1">Japanese</p>
              <p className="text-xs text-zinc-500">Beginner</p>
            </div>
            <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-sm">
              <p className="text-sm font-medium text-zinc-100 mb-1">Chinese</p>
              <p className="text-xs text-zinc-500">Beginner</p>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="mt-32 pt-8 border-t border-zinc-800 text-center">
          <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
            © 2026 Nattakit Siripap • Built with React & Tailwind
          </p>
        </footer>
      </div>

      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
