// ---------- Assets ----------
import logo from './logo.svg'
import logo_dark from './logo_dark.svg'
import cross_icon from './cross_icon.svg'
import menu_icon from './menu_icon.svg'
import star_icon from './star_icon.svg'
import left_arrow from './left_arrow.svg'
import right_arrow from './right_arrow.svg'
import header_img from './header_img.png'
import brand_img from './brand_img.png'
import project_img_1 from './project_img_1.jpg'
import project_img_2 from './project_img_2.jpg'
import project_img_3 from './project_img_3.jpg'
import project_img_4 from './project_img_4.jpg'
import project_img_5 from './project_img_5.jpg'
import project_img_6 from './project_img_6.jpg'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import profile_img_3 from './profile_img_3.png'

// export all assets
export const assets = {
  logo,
  logo_dark,
  cross_icon,
  menu_icon,
  star_icon,
  header_img,
  brand_img,
  project_img_1,
  project_img_2,
  project_img_3,
  project_img_4,
  left_arrow,
  right_arrow,
}

// ---------- Projects ----------
export const projectsData = [
  {
    title: "Skyline Haven",
    price: "$2,50,000",
    location: "California",
    image: project_img_1,
  },
  {
    title: "Vista Verde",
    price: "$2,50,000",
    location: "San Francisco",
    image: project_img_2,
  },
  {
    title: "Serenity Suites",
    price: "$2,50,000",
    location: "Chicago",
    image: project_img_3,
  },
  {
    title: "Central Square",
    price: "$2,50,000",
    location: "Los Angeles",
    image: project_img_4,
  },
  {
    title: "Vista Verde",
    price: "$2,50,000",
    location: "San Francisco",
    image: project_img_5,
  },
  {
    title: "Serenity Suites",
    price: "$2,50,000",
    location: "Chicago",
    image: project_img_6,
  },
]

// ---------- Testimonials ----------
export const testimonialsData = [
  {
    name: "Donald Jackman",
    title: "Marketing Manager",
    image: profile_img_1,
    alt: "Portrait of Donald Jackman",
    rating: 5,
    text: "From the very first meeting, they understood my vision and helped me find the perfect property. Their attention to detail and commitment to client satisfaction is unmatched.",
  },
  {
    name: "Richard Nelson",
    title: "UI/UX Designer",
    image: profile_img_2,
    alt: "Portrait of Richard Nelson",
    rating: 4,
    text: "From the very first meeting, they understood my vision and helped me find the perfect property. Their attention to detail and commitment to client satisfaction is unmatched.",
  },
  {
    name: "James Washington",
    title: "Co-Founder",
    image: profile_img_3,
    alt: "Portrait of James Washington",
    rating: 5,
    text: "From the very first meeting, they understood my vision and helped me find the perfect property. Their attention to detail and commitment to client satisfaction is unmatched.",
  },
]

// ---------- Blog Categories ----------
export const blogCategories = [
  'All',
  'Technology',
  'Startup',
  'Lifestyle',
  'Finance',
]

// ---------- Blog Data ----------
export const blog_data = [
  {
    _id: "6805ee7dd8f584af5da78d37",
    title: "A detailed step by step guide to manage your lifestyle",
    description: `
      <h1>A Simple Step-by-Step Guide to Managing Your Lifestyle</h1>
      <p>If you're looking to improve your health, boost productivity, 
      and create a balanced life, managing your lifestyle intentionally is key.</p>
      <h2>1. Assess Your Current Lifestyle</h2>
      <p>Track your habits for a week. Reflect on what's working and what needs change.</p>
    `,
    category: "Lifestyle",
    author: "John Doe",
    date: "2025-09-21",
    image: "https://i.pinimg.com/736x/dc/6b/82/dc6b822d67103e6b93cce14246c60b62.jpg",
  },
  {
    _id: "6805ee7dd8f584af5da78d38",
    title: "Top 5 Technologies Shaping the Future",
    description: `
      <h1>Emerging Tech Trends</h1>
      <p>From AI to blockchain, new technologies are transforming industries.</p>
    `,
    category: "Technology",
    author: "Jane Smith",
    date: "2025-09-20",
    image: "https://i.pinimg.com/736x/16/73/e0/1673e0a35aec9da828ebd8206e158be2.jpg",
  },
  {
    _id: "6805ee7dd8f584af5da78d39",
    title: "How to create an effective startup roadmap",
    description: `
      <h1>Startup Roadmap</h1>
      <p>Creating an effective roadmap helps you turn an idea into a business.</p>
    `,
    category: "Startup",
    author: "Ali Khan",
    date: "2025-09-18",
    image: "https://i.pinimg.com/736x/70/a5/72/70a57213303a27c2de4a94b8df4bc30b.jpg",
  },
  {
    _id: "6805ee7dd8f584af5da78d40",
    title: "Learning new technology to boost your career",
    description: `
      <h1>Boost Your Career</h1>
      <p>Stay ahead by learning new skills like AI, cloud computing, and cybersecurity.</p>
    `,
    category: "Technology",
    author: "Sarah Lee",
    date: "2025-09-17",
    image: "https://i.pinimg.com/736x/26/90/04/2690044a5f8a0f9b1c377c17ac89dbbb.jpg",
  },
  {
    _id: "6805ee7dd8f584af5da78d41",
    title: "Tips for getting the most out of apps and software",
    description: `
      <h1>Maximize Productivity</h1>
      <p>Use productivity apps smartly to save time and increase focus.</p>
    `,
    category: "Technology",
    author: "Mohamed Ali",
    date: "2025-09-15",
    image: "https://i.pinimg.com/1200x/27/a6/9d/27a69d927a0bdb30681253937e454277.jpg",
  },
  {
    _id: "6805ee7dd8f584af5da78d42",
    title: "Enhancing your skills and lifestyle balance",
    description: `
      <h1>Work-Life Balance</h1>
      <p>Balance work and personal life to reduce stress and improve wellbeing.</p>
    `,
    category: "Lifestyle",
    author: "Fatima Noor",
    date: "2025-09-14",
    image: "https://i.pinimg.com/736x/42/d8/4e/42d84e281b942b2e92175043868ad197.jpg",
  },
  {
    _id: "6805ee7dd8f584af5da78d43",
    title: "Taxes on Luxury Houses",
    description: `
      <h1>Luxury House Taxes</h1>
      <p>Understand how taxes affect high-value property investments.</p>
    `,
    category: "Finance",
    author: "James White",
    date: "2025-09-13",
    image: "https://i.pinimg.com/736x/ed/64/f8/ed64f8c4b6d82ab7ebeeef8e548109bb.jpg",
  },
  {
    _id: "6805ee7dd8f584af5da78d44",
    title: "The New Way of Study",
    description: `
      <h1>Modern Study Habits</h1>
      <p>Adopt online tools and modern learning styles for better results.</p>
    `,
    category: "Finance",
    author: "Aisha Yusuf",
    date: "2025-09-12",
    image: "https://i.pinimg.com/1200x/7c/7c/cf/7c7ccfbd7ec4a930d1bd7dff13b0ca87.jpg",
  },
]

// ---------- Footer Data ----------
export const footer_data = [
  {
    title: "Quick Links",
    links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"],
  },
  {
    title: "Need Help?",
    links: [
      "Delivery Information",
      "Return & Refund Policy",
      "Payment Methods",
      "Track your Order",
      "Contact Us",
    ],
  },
  {
    title: "Follow Us",
    links: ["Instagram", "Twitter", "Facebook", "TikTok"],
  },
]
