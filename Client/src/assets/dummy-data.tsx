import { UploadIcon, VideoIcon, ZapIcon } from 'lucide-react';

export const featuresData = [
    {
        icon: <UploadIcon className="w-6 h-6" />,
        title: 'Smart Upload',
        desc: 'Drag & drop your assets.We auto-optimize formats and sizes.'
    },
    {
        icon: <ZapIcon className="w-6 h-6" />,
        title: 'Instant Compose',
        desc: 'Combine product and model photos into social-ready posts in seconds.'
    },
    {
        icon: <VideoIcon className="w-6 h-6" />,
        title: 'Multi-Format Export',
        desc: 'Export in 9:16 or 16:9 aspect ratios ready for Reels, TikTok, and ads.'
    }
];

export const plansData = [
    {
        id: 'starter',
        name: 'Starter',
        price: '₹10',
        desc: 'Try the platform at no cost.',
        credits: 25,
        features: [
            '25 Credits',
            'Standard quality',
            'No watermark',
            'Slower generation speed',
            'Email support'
        ]
    },
    {
        id: 'pro',
        name: 'Growth',
        price: '$29',
        desc: 'Growing teams and businesses.',
        credits: 'Monthly',
        features: [
            '80 Credits',
            'HD quality',
            'No watermark',
            'Video generation',
            'Priority support'
        ],
        popular: true
    },
    {
        id: 'ultra',
        name: 'ultra',
        price: '$99',
        desc: 'Scale across teams and agencies.',
        credits: 300,
        features: [
            '300 Credits',
            'FHD quality',
            'No watermarks',
            'Fast generation speed',
            'Chat + Email support'
        ]
    }
];

export const faqData = [
    {
        question: 'How does post composition work?',
        answer: 'Upload a product photo and a model photo. We use Cloudinary to overlay and resize them into a platform-ready Images post in your chosen aspect ratio.'
    },
    {
        question: 'Do I own the composed images?',
        answer: 'Yes — you receive full commercial rights to any posts you create on the platform. Use them for ads, e-commerce, social media, and more.'
    },
    {
        question: 'Can I cancel anytime?',
        answer: 'Yes -you can cancel from your dashboard.You will retain access through the end of your billing period'
    },
    {
        question: 'What input formats do you support?',
        answer: 'We accept JPG, PNG, and WEBP. Outputs are high-resolution images optimized for social platforms.'
    }
];

export const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { name: "Home", url: "#" },
      { name: "Features", url: "#" },
      { name: "Pricing", url: "#" },
      { name: "FAQ", url: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", url: "#" },
      { name: "Terms of Service", url: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { name: "Twitter", url: "https://github.com/Rayyan-Kra" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/rayyan77/" },
      { name: "GitHub", url: "https://github.com/Rayyan-Kra" },
    ],
  },
];