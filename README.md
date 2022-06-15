## NEXT.JS
npx create-next-app my-project
cd my-project

# next.config
/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
}

module.exports = nextConfig


## TAILWIND.CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# tailwind.config
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

# globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .center{
    @apply flex items-center justify-center;
  }
  .evenly{
    @apply flex items-center justify-evenly;
  }
  .between{
    @apply flex items-center justify-between;
  }
  .p-text{
    @apply py-2 px-4 sm:py-4 sm:px-6 md:py-6 md:px-8
  }
  .page-title{
    @apply text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold w-fit mx-auto my-8
  }
  .text-heading{
    @apply text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold
  }
  .text-subheading{
    @apply text-base sm:text-lg md:text-xl lg:text-2xl font-bold
  }
  .text-content{
    @apply text-sm sm:text-base md:text-lg lg:text-xl
  }
  .shadow-box{
    @apply shadow-2xl hover:shadow-none duration-300 ease-in-out mx-auto
  }
  .full{
    @apply w-full h-full
  }
  .duration-long{
    @apply duration-500 ease-in-out
  }
  .duration{
    @apply duration-300 ease-in-out
  }
  .duration-short{
    @apply duration-75 ease-in-out
  }
}

## REACT ICONS
npm install react-icons --save

## FRAMER MOTION
npm i framer-motion

## RECOIL.JS
npm install recoil

## CONTENTFUL
npm i contentful
npm i @contentful/rich-text-react-renderer



## REMOVE
- Home.module.css
- index.js

## COPY PASTE
- components folder
- _app.js
- index.js
- about.js

###### OR GIT CLONE ######
- git clone https://github.com/fvjupiter/basic-next-tailwind-setup.git
- remove package-lock.json
- remove node_modules
- check package.json (newest versions of react etc.)
- npm install
