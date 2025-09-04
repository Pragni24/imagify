import logo from './logo.png'
import logo_icon from './logo_icon.svg'
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import star_icon from './star_icon.svg'
import rating_star from './rating_star.svg'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import step_icon_1 from './step_icon_1.svg'
import step_icon_2 from './step_icon_2.svg'
import step_icon_3 from './step_icon_3.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import cross_icon from './cross_icon.svg'
import star_group from './star_group.png'
import credit_star from './credit_star.svg'
import profile_icon from './profile_icon.png'
import img2 from './img2.jpg'
import sample1 from './sample1.JPG'
import sample2 from './sample2.JPG'

export const assets = {
    logo,
    sample1,
    sample2,
    logo_icon,
    facebook_icon,
    instagram_icon,
    twitter_icon,
    star_icon,
    rating_star,
    email_icon,
    lock_icon,
    cross_icon,
    star_group,
    credit_star,
    profile_icon
}

export const stepsData = [
    {
      title: 'Describe Your Vision',
      description: 'Type a phrase, sentence, or paragraph that describes the design you want to create.',
      icon: step_icon_1,
    },
    {
      title: 'Watch the Magic',
      description: 'Our AI-powered engine will transform your text into a high-quality, unique phone case design in seconds.',
      icon: step_icon_2,
    },
    {
      title: 'Download & Share',
      description: 'Instantly download your creation or share it with the world directly from our platform.',
      icon: step_icon_3,
    },
  ];

export const testimonialsData = [
    {
        image:profile_img_1,
        name:'Donald Jackman',
        stars:5,
        text:`I've always wanted a phone case that was truly my own, but I'm terrible at design. CaseCraze was a game-changer—I just typed in a  idea, and it created a design even better than I imagined. Now I have a professional-quality, unique case that's completely one-of-a-kind.`
    },
    {
        image:profile_img_2,
        name:'Richard Nelson',
        stars:4,
        text:`I needed a new case design fast and didn't want to spend hours scrolling through premade options. CaseCraze was the perfect solution, instantly giving me a beautiful, minimalist design. It saved me a ton of time and gave me exactly what I was looking for.`
    },
    {
        image:profile_img_1,
        name:'Donald Jackman',
        stars:5,
        text:`I was looking for a unique birthday gift for my sister, but had no idea what to design. I simply entered a few details about her interests, and CaseCraze created a gorgeous, personalized design. It was such a creative and thoughtful gift that she absolutely loved.`
    },
]

export const plans = [
    {
      id: 'Basic',
      price: 10,
      credits: 100,
      desc: 'Best for personal use.'
    },
    {
      id: 'Advanced',
      price: 50,
      credits: 500,
      desc: 'Best for business use.'
    },
    {
      id: 'Business',
      price: 250,
      credits: 5000,
      desc: 'Best for enterprise use.'
    },
  ]