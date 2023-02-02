import { Container } from '@/components/Container'

export function BlogHeroText({ children }) {
  return (
    <div className="relative px-6 pt-16 pb-20 bg-gray-50 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Step-by-step:
            <br />
            Starting a successful small business in Norway
          </h2>
          <p className="max-w-2xl mx-auto mt-3 text-xl text-gray-500 sm:mt-4">
            The information on this blog gives you an idea of the costs, how to
            make your website and other practical topics that may be useful in
            starting a small business in Norway.
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}
