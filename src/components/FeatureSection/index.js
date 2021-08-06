// Retrieved from tailwind-kit.com/components/feature
import { DogLooking, GuyWorking, Harold, MobilePhones } from '../../assets/index';

export default function FeatureSection(){
    return(

        <div class="max-w-screen-xl p-4 mx-auto px-4 sm:px-6 lg:px-8 relative py-26 lg:my-20">
            <div class="relative">
                <div class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
                    <div class="lg:col-start-2 lg:max-w-2xl ml-auto">
                        <h4 class="mt-2 text-2xl leading-8 font-extrabold text-gray-900 dark:text-white sm:text-3xl sm:leading-9">
                            Another happy landing
                        </h4>
                        <p class="mt-4 text-lg leading-6 text-gray-500 dark:text-gray-300">
                            Jom reduces the size of link into our custom url key. Not to worry, we will fly you to your original direction from our site. Simply enter your desired link and shorten it for future uses.
                        </p>
                        <ul class="mt-8 md:grid md:grid-cols-2 gap-6">
                            <li class="mt-6 lg:mt-0">
                                <div class="flex">
                                    <span class="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 dark:text-green-500 drark:bg-transparent">
                                        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd">
                                            </path>
                                        </svg>
                                    </span>
                                    <span class="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                                        Simple
                                    </span>
                                </div>
                            </li>
                            <li class="mt-6 lg:mt-0">
                                <div class="flex">
                                    <span class="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 dark:text-green-500 drark:bg-transparent">
                                        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd">
                                            </path>
                                        </svg>
                                    </span>
                                    <span class="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                                        Guaranteed
                                    </span>
                                </div>
                            </li>
                            <li class="mt-6 lg:mt-0">
                                <div class="flex">
                                    <span class="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 dark:text-green-500 drark:bg-transparent">
                                        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd">
                                            </path>
                                        </svg>
                                    </span>
                                    <span class="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                                        Shorter
                                    </span>
                                </div>
                            </li>
                            <li class="mt-6 lg:mt-0">
                                <div class="flex">
                                    <span class="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 dark:text-green-500 drark:bg-transparent">
                                        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd">
                                            </path>
                                        </svg>
                                    </span>
                                    <span class="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                                        Full control
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="mt-10 lg:-mx-4 relative relative-20 lg:mt-0 lg:col-start-1">
                        <div class="relative space-y-4">
                            <div class="flex items-end justify-center lg:justify-start space-x-4">
                                <img class="rounded-lg shadow-lg w-32 md:w-56" width="200" src={DogLooking} alt="1" />
                                <img class="rounded-lg shadow-lg w-40 md:w-64" width="260" src={GuyWorking} alt="2" />
                            </div>
                            <div class="flex items-start justify-center lg:justify-start space-x-4 ml-12">
                                <img class="rounded-lg shadow-lg w-24 md:w-40" width="170" src={Harold} alt="3" />
                                <img class="rounded-lg shadow-lg w-32 md:w-56" width="200" src={MobilePhones} alt="4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}