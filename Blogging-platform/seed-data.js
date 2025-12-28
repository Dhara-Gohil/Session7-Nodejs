import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Blog from './models/Blog.js';

dotenv.config();

const sampleCategories = [
  { name: 'Technology' },
  { name: 'Travel' },
  { name: 'Food' },
  { name: 'Lifestyle' },
  { name: 'Business' },
  { name: 'Health & Wellness' },
  { name: 'Personal Growth' },
  { name: 'Photography' }
];

const sampleBlogs = [
  {
    title: 'Getting Started with React Hooks',
    slug: 'getting-started-with-react-hooks',
    description: '<p>React Hooks revolutionized how we write React components. In this comprehensive guide, we\'ll explore the fundamentals of hooks and how they can simplify your React development workflow.</p><p>Hooks allow you to use state and other React features without writing a class component. They provide a more direct API to the React concepts you already know.</p><h3>Key Benefits:</h3><ul><li>Simpler component logic</li><li>Better code reusability</li><li>Easier testing and debugging</li><li>Improved performance optimization</li></ul><p>We\'ll cover useState, useEffect, useContext, and custom hooks with practical examples.</p>',
    categoryName: 'Technology',
    thumbnailImage: 'https://picsum.photos/400/200?random=1',
    featuredImage: 'https://picsum.photos/800/400?random=1'
  },
  {
    title: 'Hidden Gems of Southeast Asia',
    slug: 'hidden-gems-southeast-asia',
    description: '<p>Beyond the popular tourist destinations, Southeast Asia holds countless hidden treasures waiting to be discovered. Join me as I share some of the most breathtaking, off-the-beaten-path locations I\'ve encountered during my travels.</p><p>From secluded beaches in the Philippines to ancient temples in Cambodia, these destinations offer authentic experiences away from the crowds.</p><h3>Featured Destinations:</h3><ol><li><strong>Siquijor Island, Philippines</strong> - Mystical island with pristine beaches</li><li><strong>Kampot, Cambodia</strong> - Riverside town with French colonial charm</li><li><strong>Nong Khiaw, Laos</strong> - Stunning limestone karsts and river views</li><li><strong>Flores, Indonesia</strong> - Gateway to Komodo dragons and pink beaches</li></ol>',
    categoryName: 'Travel',
    thumbnailImage: 'https://picsum.photos/400/200?random=2',
    featuredImage: 'https://picsum.photos/800/400?random=2'
  },
  {
    title: 'The Art of Sourdough: A Beginner\'s Journey',
    slug: 'art-of-sourdough-beginners-journey',
    description: '<p>There\'s something magical about creating bread from just flour, water, and time. My sourdough journey began during lockdown, and it has become one of my most rewarding hobbies.</p><p>In this detailed guide, I\'ll walk you through everything you need to know to start your own sourdough adventure, from creating your starter to baking your first perfect loaf.</p><h3>What You\'ll Learn:</h3><ul><li>Creating and maintaining a sourdough starter</li><li>Understanding fermentation timing</li><li>Shaping techniques for different bread types</li><li>Troubleshooting common problems</li><li>Recipe variations and flavor additions</li></ul><p>The process requires patience, but the results are incredibly satisfying.</p>',
    categoryName: 'Food',
    thumbnailImage: 'https://picsum.photos/400/200?random=3',
    featuredImage: 'https://picsum.photos/800/400?random=3'
  },
  {
    title: 'Minimalism: Less Stuff, More Life',
    slug: 'minimalism-less-stuff-more-life',
    description: '<p>Two years ago, I decided to embrace minimalism, and it completely transformed my relationship with possessions, time, and happiness. This isn\'t about living with nothing—it\'s about living with intention.</p><p>Minimalism has helped me focus on what truly matters: relationships, experiences, and personal growth. Here\'s how you can start your own minimalist journey.</p><h3>Key Principles:</h3><ul><li>Quality over quantity in all purchases</li><li>Regular decluttering and mindful consumption</li><li>Focusing on experiences rather than things</li><li>Creating peaceful, uncluttered spaces</li><li>Developing gratitude for what you have</li></ul><p>Start small—even decluttering one drawer can make a difference.</p>',
    categoryName: 'Lifestyle',
    thumbnailImage: 'https://picsum.photos/400/200?random=4',
    featuredImage: 'https://picsum.photos/800/400?random=4'
  },
  {
    title: 'Building a Sustainable Remote Team Culture',
    slug: 'building-sustainable-remote-team-culture',
    description: '<p>After managing remote teams for over three years, I\'ve learned that successful remote work isn\'t just about the right tools—it\'s about intentionally building culture and connection.</p><p>Remote work offers incredible flexibility, but it also presents unique challenges in maintaining team cohesion, communication, and company culture.</p><h3>Essential Strategies:</h3><ol><li><strong>Overcommunicate Everything</strong> - Clear, frequent communication prevents misunderstandings</li><li><strong>Create Virtual Water Cooler Moments</strong> - Informal interactions build relationships</li><li><strong>Establish Clear Boundaries</strong> - Respect work-life balance for everyone</li><li><strong>Invest in the Right Tools</strong> - Technology should enable, not hinder collaboration</li><li><strong>Regular Check-ins</strong> - Both professional and personal wellness matter</li></ol>',
    categoryName: 'Business',
    thumbnailImage: 'https://picsum.photos/400/200?random=5',
    featuredImage: 'https://picsum.photos/800/400?random=5'
  },
  {
    title: 'Understanding JavaScript Closures',
    slug: 'understanding-javascript-closures',
    description: '<p>Closures are one of JavaScript\'s most powerful features, yet they often confuse developers. Once you understand closures, you\'ll see them everywhere in JavaScript and appreciate their elegance.</p><p>A closure gives you access to an outer function\'s scope from an inner function. This simple concept enables powerful programming patterns and is fundamental to understanding JavaScript.</p><h3>Practical Applications:</h3><ul><li>Data privacy and encapsulation</li><li>Function factories and currying</li><li>Event handlers and callbacks</li><li>Module patterns</li><li>Partial application</li></ul><p>We\'ll explore real-world examples and common pitfalls to avoid.</p>',
    categoryName: 'Technology',
    thumbnailImage: 'https://picsum.photos/400/200?random=6',
    featuredImage: 'https://picsum.photos/800/400?random=6'
  },
  {
    title: 'Slow Travel: Why I Stopped Racing Through Countries',
    slug: 'slow-travel-stopped-racing-through-countries',
    description: '<p>After years of trying to see as much as possible in limited time, I discovered the joy of slow travel. Spending weeks or months in a single location has completely changed how I experience the world.</p><p>Slow travel isn\'t just about staying longer—it\'s about traveling with intention, building connections, and truly understanding the places you visit.</p><h3>Benefits of Slow Travel:</h3><ul><li>Deeper cultural immersion and understanding</li><li>More meaningful connections with locals</li><li>Reduced travel stress and fatigue</li><li>Better value for money</li><li>Lower environmental impact</li><li>Time for reflection and personal growth</li></ul><p>My month in a small Portuguese village taught me more than years of rushed city-hopping.</p>',
    categoryName: 'Travel',
    thumbnailImage: 'https://picsum.photos/400/200?random=7',
    featuredImage: 'https://picsum.photos/800/400?random=7'
  },
  {
    title: 'Fermentation: Ancient Wisdom for Modern Kitchens',
    slug: 'fermentation-ancient-wisdom-modern-kitchens',
    description: '<p>Fermentation is humanity\'s oldest form of food preservation, and it\'s experiencing a renaissance in modern kitchens. Beyond preservation, fermented foods offer incredible flavors and health benefits.</p><p>From kimchi to kombucha, fermented foods are packed with probiotics and complex flavors that can transform your cooking and potentially improve your gut health.</p><h3>Easy Fermentation Projects:</h3><ol><li><strong>Sauerkraut</strong> - Just cabbage and salt, incredible results</li><li><strong>Water Kefir</strong> - Probiotic fizzy drinks at home</li><li><strong>Fermented Hot Sauce</strong> - Complex heat with beneficial bacteria</li><li><strong>Pickled Vegetables</strong> - Quick pickles ready in days</li></ol><p>Start with simple projects and gradually explore more complex ferments.</p>',
    categoryName: 'Food',
    thumbnailImage: 'https://picsum.photos/400/200?random=8',
    featuredImage: 'https://picsum.photos/800/400?random=8'
  },
  {
    title: 'Digital Detox: Reclaiming Your Attention',
    slug: 'digital-detox-reclaiming-your-attention',
    description: '<p>Our devices were supposed to make life easier, but somewhere along the way, they began controlling us. A digital detox isn\'t about rejecting technology—it\'s about using it intentionally.</p><p>After implementing regular digital detoxes, I\'ve noticed improved focus, better sleep, and more meaningful real-world connections. Here\'s how to start your own digital wellness journey.</p><h3>Practical Steps:</h3><ul><li>Create phone-free zones and times</li><li>Use app timers and restrictions</li><li>Practice single-tasking</li><li>Rediscover offline hobbies</li><li>Implement a morning routine without screens</li><li>Choose quality over quantity in digital consumption</li></ul><p>Small changes can lead to significant improvements in mental clarity and life satisfaction.</p>',
    categoryName: 'Lifestyle',
    thumbnailImage: 'https://picsum.photos/400/200?random=9',
    featuredImage: 'https://picsum.photos/800/400?random=9'
  },
  {
    title: 'The Future of Web Development: Trends to Watch',
    slug: 'future-web-development-trends-to-watch',
    description: '<p>Web development is evolving rapidly, with new frameworks, tools, and paradigms emerging constantly. As someone who\'s been in the industry for over a decade, here are the trends I believe will shape the next few years.</p><p>From the rise of edge computing to the maturation of WebAssembly, the web platform continues to grow more powerful and capable.</p><h3>Key Trends:</h3><ol><li><strong>Edge Computing</strong> - Bringing computation closer to users</li><li><strong>WebAssembly</strong> - Near-native performance in browsers</li><li><strong>Jamstack Evolution</strong> - Static sites with dynamic capabilities</li><li><strong>AI-Assisted Development</strong> - Tools that help write better code</li><li><strong>Web3 Integration</strong> - Decentralized web technologies</li></ol><p>The future of web development is exciting and full of possibilities.</p>',
    categoryName: 'Technology',
    thumbnailImage: 'https://picsum.photos/400/200?random=10',
    featuredImage: 'https://picsum.photos/800/400?random=10'
  },
  {
    title: 'Starting a Side Business While Working Full-Time',
    slug: 'starting-side-business-working-full-time',
    description: '<p>Building a side business while maintaining a full-time job is challenging but entirely possible. Over the past two years, I\'ve grown my freelance consulting practice from zero to a sustainable income stream.</p><p>The key is starting small, being strategic with your time, and gradually building momentum. Here\'s what I\'ve learned about balancing entrepreneurship with employment.</p><h3>Essential Strategies:</h3><ul><li>Start with skills you already have</li><li>Use early mornings and weekends effectively</li><li>Automate and systematize everything possible</li><li>Focus on high-value, low-maintenance services</li><li>Build relationships before you need them</li><li>Keep detailed financial records from day one</li></ul><p>The journey requires sacrifice, but the freedom and security it provides are worth it.</p>',
    categoryName: 'Business',
    thumbnailImage: 'https://picsum.photos/400/200?random=11',
    featuredImage: 'https://picsum.photos/800/400?random=11'
  },
  {
    title: 'Plant-Based Cooking: Beyond Salads',
    slug: 'plant-based-cooking-beyond-salads',
    description: '<p>When I transitioned to a plant-based diet, I discovered a whole world of flavors and techniques I never knew existed. Plant-based cooking is far from limiting—it\'s an adventure in creativity and nutrition.</p><p>From hearty lentil bolognese to creamy cashew-based sauces, plant-based cooking can be satisfying, delicious, and nutritionally complete.</p><h3>Game-Changing Techniques:</h3><ul><li>Using umami-rich ingredients for depth</li><li>Mastering different protein sources</li><li>Creating creamy textures without dairy</li><li>Balancing flavors and nutrients</li><li>Meal prep strategies for busy weeks</li><li>Making plant-based versions of comfort foods</li></ul><p>Whether you\'re fully plant-based or just looking to eat more vegetables, these techniques will transform your cooking.</p>',
    categoryName: 'Food',
    thumbnailImage: 'https://picsum.photos/400/200?random=12',
    featuredImage: 'https://picsum.photos/800/400?random=12'
  },
  {
    title: 'The Psychology of Habit Formation',
    slug: 'psychology-of-habit-formation',
    description: '<p>Why do some habits stick while others fade away? After reading extensively about behavioral psychology and experimenting with my own habits, I\'ve discovered the science behind lasting change.</p><p>Understanding how habits work in your brain can help you build positive routines and break negative patterns more effectively.</p><h3>The Habit Loop:</h3><ol><li><strong>Cue</strong> - The trigger that initiates the behavior</li><li><strong>Routine</strong> - The behavior itself</li><li><strong>Reward</strong> - The benefit you gain from the behavior</li></ol><h3>Strategies for Success:</h3><ul><li>Start incredibly small (2-minute rule)</li><li>Stack new habits onto existing ones</li><li>Design your environment for success</li><li>Focus on identity change, not just outcomes</li><li>Track progress without obsessing over perfection</li></ul>',
    categoryName: 'Lifestyle',
    thumbnailImage: 'https://picsum.photos/400/200?random=13',
    featuredImage: 'https://picsum.photos/800/400?random=13'
  },
  {
    title: 'Backpacking Through Patagonia: Lessons from the Trail',
    slug: 'backpacking-through-patagonia-lessons-from-trail',
    description: '<p>Three weeks in Patagonia taught me more about resilience, simplicity, and the power of nature than years of comfortable living. The raw beauty of this region is matched only by its challenges.</p><p>From the towering peaks of Torres del Paine to the glacial landscapes of El Calafate, Patagonia offers some of the world\'s most spectacular trekking experiences.</p><h3>Key Experiences:</h3><ul><li>The W Trek in Torres del Paine</li><li>Glacier hiking in El Calafate</li><li>Wild camping under the Southern Cross</li><li>Dealing with Patagonian weather extremes</li><li>Meeting fellow travelers from around the world</li></ul><h3>Lessons Learned:</h3><ul><li>You need less than you think</li><li>Weather can change everything in minutes</li><li>The journey matters more than the destination</li><li>Solitude can be profoundly healing</li></ul>',
    categoryName: 'Travel',
    thumbnailImage: 'https://picsum.photos/400/200?random=14',
    featuredImage: 'https://picsum.photos/800/400?random=14'
  },
  {
    title: 'Building APIs with Node.js and Express',
    slug: 'building-apis-nodejs-express',
    description: '<p>Node.js and Express provide a powerful, flexible foundation for building modern APIs. In this comprehensive guide, we\'ll explore best practices for creating scalable, maintainable backend services.</p><p>From basic routing to advanced middleware, authentication, and database integration, we\'ll cover everything you need to build production-ready APIs.</p><h3>Topics Covered:</h3><ol><li><strong>Project Structure</strong> - Organizing code for maintainability</li><li><strong>Middleware</strong> - Request processing and error handling</li><li><strong>Authentication</strong> - JWT tokens and security best practices</li><li><strong>Database Integration</strong> - Working with MongoDB and Mongoose</li><li><strong>Testing</strong> - Unit and integration testing strategies</li><li><strong>Deployment</strong> - Production considerations and monitoring</li></ol><p>We\'ll build a complete blog API as our example project.</p>',
    categoryName: 'Technology',
    thumbnailImage: 'https://picsum.photos/400/200?random=15',
    featuredImage: 'https://picsum.photos/800/400?random=15'
  },
  {
    title: 'Meditation for Busy Minds: A Practical Approach',
    slug: 'meditation-for-busy-minds-practical-approach',
    description: '<p>For years, I thought meditation wasn\'t for me. My mind was too busy, too scattered, too impatient. But I discovered that meditation isn\'t about emptying your mind—it\'s about observing it with kindness.</p><p>This practical guide will help you start a sustainable meditation practice, even if you\'ve tried and failed before.</p><h3>Getting Started:</h3><ul><li>Start with just 2-3 minutes daily</li><li>Use guided meditations initially</li><li>Find a consistent time and place</li><li>Be patient with your wandering mind</li><li>Focus on consistency over duration</li></ul><h3>Types of Meditation:</h3><ol><li><strong>Mindfulness</strong> - Observing thoughts without judgment</li><li><strong>Body Scan</strong> - Progressive relaxation technique</li><li><strong>Loving-Kindness</strong> - Cultivating compassion</li><li><strong>Walking Meditation</strong> - Mindfulness in movement</li></ol>',
    categoryName: 'Health & Wellness',
    thumbnailImage: 'https://picsum.photos/400/200?random=16',
    featuredImage: 'https://picsum.photos/800/400?random=16'
  },
  {
    title: 'The Art of Street Photography',
    slug: 'art-of-street-photography',
    description: '<p>Street photography is about capturing authentic moments of human life in public spaces. It\'s a genre that requires patience, observation skills, and respect for your subjects.</p><p>Over the past five years of documenting urban life, I\'ve learned that great street photography is less about expensive equipment and more about understanding light, timing, and human behavior.</p><h3>Essential Techniques:</h3><ul><li>Master the art of being invisible</li><li>Understand natural light and shadows</li><li>Learn to anticipate decisive moments</li><li>Respect privacy and cultural sensitivities</li><li>Practice composition rules and when to break them</li></ul><h3>Equipment Tips:</h3><ul><li>Prime lenses for better image quality</li><li>Compact cameras for discretion</li><li>Fast autofocus for quick shots</li><li>High ISO performance for low light</li></ul>',
    categoryName: 'Photography',
    thumbnailImage: 'https://picsum.photos/400/200?random=17',
    featuredImage: 'https://picsum.photos/800/400?random=17'
  },
  {
    title: 'Learning a New Language After 30',
    slug: 'learning-new-language-after-30',
    description: '<p>Contrary to popular belief, adults can learn languages effectively—sometimes even better than children. At 32, I decided to learn Portuguese, and the journey has been both challenging and incredibly rewarding.</p><p>Here\'s what I\'ve learned about language acquisition as an adult and the strategies that actually work.</p><h3>Effective Strategies:</h3><ol><li><strong>Immersion at Home</strong> - Change your phone language, watch shows with subtitles</li><li><strong>Spaced Repetition</strong> - Use apps like Anki for vocabulary retention</li><li><strong>Speaking from Day One</strong> - Find conversation partners online</li><li><strong>Focus on High-Frequency Words</strong> - Learn the most common 1000 words first</li><li><strong>Embrace Mistakes</strong> - They\'re essential for learning</li></ol><h3>Common Myths Debunked:</h3><ul><li>Adults can\'t learn pronunciation</li><li>You need perfect grammar to communicate</li><li>Immersion requires travel</li><li>Language learning apps are enough</li></ul>',
    categoryName: 'Personal Growth',
    thumbnailImage: 'https://picsum.photos/400/200?random=18',
    featuredImage: 'https://picsum.photos/800/400?random=18'
  },
  {
    title: 'Sustainable Fashion: Building a Conscious Wardrobe',
    slug: 'sustainable-fashion-building-conscious-wardrobe',
    description: '<p>The fashion industry is one of the world\'s largest polluters, but as consumers, we have the power to drive change. Building a sustainable wardrobe isn\'t about perfection—it\'s about making more conscious choices.</p><p>After overhauling my closet two years ago, I\'ve discovered that sustainable fashion can be stylish, affordable, and deeply satisfying.</p><h3>Key Principles:</h3><ul><li>Buy less, choose well, make it last</li><li>Invest in quality basics and timeless pieces</li><li>Support ethical and transparent brands</li><li>Learn basic clothing care and repair</li><li>Explore secondhand and vintage options</li><li>Consider the cost per wear, not just the price tag</li></ul><h3>Building Your Capsule Wardrobe:</h3><ol><li>Audit your current closet</li><li>Identify your personal style</li><li>Choose a cohesive color palette</li><li>Invest in quality basics first</li><li>Add personality with accessories</li></ol>',
    categoryName: 'Lifestyle',
    thumbnailImage: 'https://picsum.photos/400/200?random=19',
    featuredImage: 'https://picsum.photos/800/400?random=19'
  },
  {
    title: 'The Science of Sleep: Optimizing Your Rest',
    slug: 'science-of-sleep-optimizing-your-rest',
    description: '<p>Sleep isn\'t a luxury—it\'s a biological necessity. Yet many of us struggle with sleep quality, often without understanding the science behind what makes for restorative rest.</p><p>After years of poor sleep and extensive research into sleep science, I\'ve transformed my sleep quality and overall health. Here\'s what the research tells us about optimizing sleep.</p><h3>Sleep Fundamentals:</h3><ul><li>Adults need 7-9 hours of quality sleep</li><li>Sleep occurs in 90-minute cycles</li><li>Deep sleep is crucial for physical recovery</li><li>REM sleep is essential for mental processing</li><li>Consistency matters more than perfection</li></ul><h3>Optimization Strategies:</h3><ol><li><strong>Sleep Environment</strong> - Cool, dark, and quiet</li><li><strong>Sleep Schedule</strong> - Consistent bedtime and wake time</li><li><strong>Pre-Sleep Routine</strong> - Wind down 1-2 hours before bed</li><li><strong>Light Exposure</strong> - Bright light in morning, dim light at night</li><li><strong>Nutrition Timing</strong> - Avoid large meals and caffeine before bed</li></ol>',
    categoryName: 'Health & Wellness',
    thumbnailImage: 'https://picsum.photos/400/200?random=20',
    featuredImage: 'https://picsum.photos/800/400?random=20'
  },
  {
    title: 'Freelancing 101: From Side Hustle to Full-Time',
    slug: 'freelancing-101-side-hustle-to-full-time',
    description: '<p>Making the transition from employee to freelancer is both exciting and terrifying. After successfully making this leap three years ago, I want to share the practical steps and mindset shifts that made it possible.</p><p>Freelancing offers freedom and flexibility, but it also requires discipline, business acumen, and resilience. Here\'s your roadmap to freelancing success.</p><h3>Before You Leap:</h3><ul><li>Build a financial safety net (3-6 months expenses)</li><li>Establish a client base while employed</li><li>Develop a portfolio of your best work</li><li>Understand your market rates</li><li>Set up basic business systems</li></ul><h3>Essential Business Skills:</h3><ol><li><strong>Client Communication</strong> - Clear, professional, timely</li><li><strong>Project Management</strong> - Deliver on time and budget</li><li><strong>Financial Management</strong> - Track income, expenses, taxes</li><li><strong>Marketing</strong> - Build your personal brand</li><li><strong>Networking</strong> - Relationships drive referrals</li></ol>',
    categoryName: 'Business',
    thumbnailImage: 'https://picsum.photos/400/200?random=21',
    featuredImage: 'https://picsum.photos/800/400?random=21'
  },
  {
    title: 'Home Brewing: Crafting Your Perfect Beer',
    slug: 'home-brewing-crafting-perfect-beer',
    description: '<p>Home brewing combines science, art, and patience to create something truly special. What started as curiosity about how beer is made has become a passionate hobby that connects me with centuries of brewing tradition.</p><p>You don\'t need expensive equipment or years of experience to brew great beer at home. With basic understanding and quality ingredients, you can create beers that rival commercial offerings.</p><h3>Getting Started:</h3><ul><li>Start with extract brewing kits</li><li>Focus on sanitation above all else</li><li>Control fermentation temperature</li><li>Keep detailed brewing notes</li><li>Be patient—good beer takes time</li></ul><h3>Essential Equipment:</h3><ol><li>Fermenting bucket with airlock</li><li>Siphoning equipment</li><li>Bottles and caps</li><li>Sanitizing solution</li><li>Hydrometer for measuring progress</li></ol><h3>Your First Brew:</h3><p>Start with a simple ale recipe, follow instructions precisely, and don\'t be discouraged if your first batch isn\'t perfect. Every brewer has made mistakes—they\'re part of the learning process.</p>',
    categoryName: 'Food',
    thumbnailImage: 'https://picsum.photos/400/200?random=22',
    featuredImage: 'https://picsum.photos/800/400?random=22'
  },
  {
    title: 'Landscape Photography: Chasing Golden Hour',
    slug: 'landscape-photography-chasing-golden-hour',
    description: '<p>Landscape photography has taught me patience, planning, and the art of waiting for the perfect moment. There\'s something magical about being in nature with your camera, watching light transform the world around you.</p><p>Great landscape photography isn\'t just about having the right equipment—it\'s about understanding light, weather, and composition to capture the essence of a place.</p><h3>Essential Techniques:</h3><ul><li>Plan shoots using weather and light apps</li><li>Arrive early, stay late for best light</li><li>Use graduated filters for high contrast scenes</li><li>Focus stack for maximum sharpness</li><li>Shoot in RAW for maximum editing flexibility</li></ul><h3>Composition Guidelines:</h3><ol><li><strong>Rule of Thirds</strong> - Place horizons on third lines</li><li><strong>Leading Lines</strong> - Use natural lines to guide the eye</li><li><strong>Foreground Interest</strong> - Add depth with foreground elements</li><li><strong>Scale</strong> - Include elements that show size</li><li><strong>Simplicity</strong> - Remove distracting elements</li></ol>',
    categoryName: 'Photography',
    thumbnailImage: 'https://picsum.photos/400/200?random=23',
    featuredImage: 'https://picsum.photos/800/400?random=23'
  },
  {
    title: 'The Power of Morning Pages',
    slug: 'power-of-morning-pages',
    description: '<p>Morning pages—three pages of longhand, stream-of-consciousness writing done first thing in the morning—have been a game-changer for my creativity and mental clarity. This practice, popularized by Julia Cameron, is deceptively simple yet profoundly transformative.</p><p>For the past year, I\'ve written morning pages almost daily, and the benefits have been remarkable: increased creativity, reduced anxiety, and greater self-awareness.</p><h3>What Are Morning Pages?</h3><ul><li>Three pages of longhand writing</li><li>Done first thing in the morning</li><li>Stream-of-consciousness style</li><li>No editing or censoring</li><li>Private—not meant to be shared</li></ul><h3>Benefits I\'ve Experienced:</h3><ol><li><strong>Mental Clarity</strong> - Clearing mental clutter before the day begins</li><li><strong>Emotional Processing</strong> - Working through feelings and concerns</li><li><strong>Creative Breakthrough</strong> - Accessing ideas buried beneath surface thoughts</li><li><strong>Problem Solving</strong> - Finding solutions through free-form thinking</li><li><strong>Self-Discovery</strong> - Learning about patterns and priorities</li></ol>',
    categoryName: 'Personal Growth',
    thumbnailImage: 'https://picsum.photos/400/200?random=24',
    featuredImage: 'https://picsum.photos/800/400?random=24'
  },
  {
    title: 'Urban Gardening: Growing Food in Small Spaces',
    slug: 'urban-gardening-growing-food-small-spaces',
    description: '<p>Living in a small apartment doesn\'t mean you can\'t grow your own food. Urban gardening has allowed me to enjoy fresh herbs, vegetables, and even some fruits right from my balcony and windowsills.</p><p>Container gardening, vertical growing, and choosing the right plants can transform even the smallest urban space into a productive garden.</p><h3>Getting Started:</h3><ul><li>Assess your available light and space</li><li>Start with easy-to-grow herbs and greens</li><li>Invest in quality containers with drainage</li><li>Use high-quality potting soil</li><li>Learn about companion planting</li></ul><h3>Best Plants for Small Spaces:</h3><ol><li><strong>Herbs</strong> - Basil, mint, parsley, cilantro</li><li><strong>Leafy Greens</strong> - Lettuce, spinach, kale, arugula</li><li><strong>Compact Vegetables</strong> - Cherry tomatoes, peppers, radishes</li><li><strong>Vertical Growers</strong> - Peas, beans, cucumbers</li></ol><h3>Space-Saving Techniques:</h3><ul><li>Vertical gardening with trellises</li><li>Hanging planters for trailing plants</li><li>Window boxes for herbs</li><li>Stackable containers</li></ul>',
    categoryName: 'Lifestyle',
    thumbnailImage: 'https://picsum.photos/400/200?random=25',
    featuredImage: 'https://picsum.photos/800/400?random=25'
  },
  {
    title: 'Strength Training for Beginners: Building a Foundation',
    slug: 'strength-training-beginners-building-foundation',
    description: '<p>Starting a strength training routine can feel intimidating, but it\'s one of the best investments you can make in your long-term health. Strength training isn\'t just about building muscle—it improves bone density, metabolism, and overall quality of life.</p><p>After years of avoiding the weight room, I finally started strength training at 35. Here\'s what I wish I had known when starting out.</p><h3>Benefits of Strength Training:</h3><ul><li>Increased muscle mass and bone density</li><li>Improved metabolism and fat burning</li><li>Better functional movement and posture</li><li>Enhanced mental health and confidence</li><li>Reduced risk of injury and chronic disease</li></ul><h3>Getting Started Safely:</h3><ol><li><strong>Learn Proper Form</strong> - Consider working with a trainer initially</li><li><strong>Start Light</strong> - Focus on movement quality over weight</li><li><strong>Progress Gradually</strong> - Increase weight or reps slowly</li><li><strong>Rest and Recover</strong> - Allow 48 hours between training same muscles</li><li><strong>Track Progress</strong> - Keep a workout log</li></ol>',
    categoryName: 'Health & Wellness',
    thumbnailImage: 'https://picsum.photos/400/200?random=26',
    featuredImage: 'https://picsum.photos/800/400?random=26'
  },
  {
    title: 'The Art of Saying No: Protecting Your Time and Energy',
    slug: 'art-of-saying-no-protecting-time-energy',
    description: '<p>Learning to say no is one of the most valuable skills you can develop. For years, I said yes to everything—every invitation, every request, every opportunity. I thought I was being helpful and open to experiences, but I was actually diluting my focus and exhausting myself.</p><p>Saying no isn\'t about being selfish or unhelpful. It\'s about being intentional with your time and energy so you can say yes to what truly matters.</p><h3>Why Saying No Is Hard:</h3><ul><li>Fear of disappointing others</li><li>Worry about missing opportunities</li><li>Desire to be liked and helpful</li><li>Guilt about setting boundaries</li><li>FOMO (fear of missing out)</li></ul><h3>Strategies for Saying No:</h3><ol><li><strong>Pause Before Responding</strong> - "Let me check my calendar and get back to you"</li><li><strong>Be Direct but Kind</strong> - "I can\'t commit to this right now"</li><li><strong>Offer Alternatives</strong> - Suggest someone else or a different time</li><li><strong>Explain Your Priorities</strong> - "I\'m focusing on X this quarter"</li><li><strong>Practice Self-Compassion</strong> - You can\'t do everything</li></ol>',
    categoryName: 'Personal Growth',
    thumbnailImage: 'https://picsum.photos/400/200?random=27',
    featuredImage: 'https://picsum.photos/800/400?random=27'
  },
  {
    title: 'Exploring Japan\'s Hidden Temples',
    slug: 'exploring-japan-hidden-temples',
    description: '<p>Beyond Kyoto\'s famous temples lies a network of hidden spiritual sites that offer profound peace and authentic cultural experiences. During my month-long journey through Japan, I discovered temples tucked away in mountains, forests, and quiet neighborhoods.</p><p>These lesser-known temples provide insight into Japan\'s spiritual heritage without the crowds of popular tourist destinations.</p><h3>Hidden Gems I Discovered:</h3><ol><li><strong>Sanzen-in, Ohara</strong> - Moss gardens and mountain views</li><li><strong>Kurama-dera</strong> - Mountain temple reached by hiking trail</li><li><strong>Adashino Nenbutsu-ji</strong> - Stone statues in bamboo groves</li><li><strong>Shisen-do</strong> - Poet\'s hermitage with stunning gardens</li></ol><h3>Temple Etiquette:</h3><ul><li>Bow before entering temple grounds</li><li>Remove hats and sunglasses</li><li>Don\'t point or touch religious objects</li><li>Photography rules vary—ask if unsure</li><li>Maintain quiet, respectful behavior</li><li>Small donations are appreciated</li></ul><h3>Best Times to Visit:</h3><p>Early morning or late afternoon offer the most peaceful experiences, with beautiful light for photography and fewer visitors.</p>',
    categoryName: 'Travel',
    thumbnailImage: 'https://picsum.photos/400/200?random=28',
    featuredImage: 'https://picsum.photos/800/400?random=28'
  },
  {
    title: 'Mastering CSS Grid: Modern Layout Techniques',
    slug: 'mastering-css-grid-modern-layout-techniques',
    description: '<p>CSS Grid has revolutionized web layout, providing developers with unprecedented control over two-dimensional layouts. After years of wrestling with floats and flexbox workarounds, Grid feels like magic.</p><p>This comprehensive guide will take you from Grid basics to advanced techniques, with practical examples you can use in real projects.</p><h3>Grid Fundamentals:</h3><ul><li>Grid containers and grid items</li><li>Explicit vs implicit grids</li><li>Grid lines, tracks, and areas</li><li>The fr unit for flexible sizing</li><li>Grid gaps for spacing</li></ul><h3>Essential Properties:</h3><ol><li><strong>display: grid</strong> - Creates a grid container</li><li><strong>grid-template-columns/rows</strong> - Defines track sizes</li><li><strong>grid-area</strong> - Places items in named areas</li><li><strong>grid-auto-flow</strong> - Controls auto-placement</li><li><strong>align-items/justify-items</strong> - Aligns grid items</li></ol><h3>Advanced Techniques:</h3><ul><li>Responsive grids without media queries</li><li>Overlapping grid items</li><li>Subgrid for nested layouts</li><li>Grid and flexbox combinations</li></ul>',
    categoryName: 'Technology',
    thumbnailImage: 'https://picsum.photos/400/200?random=29',
    featuredImage: 'https://picsum.photos/800/400?random=29'
  },
  {
    title: 'The Economics of Happiness: Money and Well-being',
    slug: 'economics-of-happiness-money-wellbeing',
    description: '<p>Does money buy happiness? The relationship between wealth and well-being is more complex than simple platitudes suggest. Research in behavioral economics and psychology reveals fascinating insights about how money affects our happiness.</p><p>After studying this topic extensively and examining my own relationship with money, I\'ve discovered that how we think about and use money matters more than how much we have.</p><h3>Key Research Findings:</h3><ul><li>Income increases happiness up to a point (around $75,000 annually)</li><li>Relative wealth matters more than absolute wealth</li><li>Experiences provide more lasting happiness than possessions</li><li>Giving money away increases personal happiness</li><li>Financial security reduces stress more than luxury increases joy</li></ul><h3>Practical Applications:</h3><ol><li><strong>Prioritize Experiences</strong> - Travel, concerts, classes over things</li><li><strong>Buy Time</strong> - Pay for services that free up your time</li><li><strong>Practice Gratitude</strong> - Appreciate what you already have</li><li><strong>Give Generously</strong> - Charitable giving boosts happiness</li><li><strong>Avoid Lifestyle Inflation</strong> - Don\'t let spending grow with income</li></ol>',
    categoryName: 'Business',
    thumbnailImage: 'https://picsum.photos/400/200?random=30',
    featuredImage: 'https://picsum.photos/800/400?random=30'
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Blog.deleteMany({});
    console.log('Cleared existing data');

    // Create categories
    const createdCategories = await Category.insertMany(sampleCategories);
    console.log('Created categories');

    // Create blogs with category references
    const blogsWithCategories = sampleBlogs.map(blog => {
      const category = createdCategories.find(cat => cat.name === blog.categoryName);
      return {
        title: blog.title,
        slug: blog.slug,
        description: blog.description,
        category: category._id,
        thumbnailImage: blog.thumbnailImage,
        featuredImage: blog.featuredImage,
        publishDate: new Date()
      };
    });

    await Blog.insertMany(blogsWithCategories);
    console.log('Created blogs');

    console.log('Sample data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();