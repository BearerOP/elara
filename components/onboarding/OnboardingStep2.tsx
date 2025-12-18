'use client'

import { motion } from 'framer-motion'
import Logo from '../ui/Logo'
import { Button } from '@/components/ui/Button'
import { CheckIcon } from '../icons'
import { ChevronLeftIcon } from 'lucide-react'

const WomanIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
      <path d="M19.5833 18.3333C19.5833 17.7808 19.8028 17.2509 20.1935 16.8602C20.5842 16.4695 21.1141 16.25 21.6667 16.25C22.2192 16.25 22.7491 16.4695 23.1398 16.8602C23.5305 17.2509 23.75 17.7808 23.75 18.3333C23.75 18.8859 23.5305 19.4158 23.1398 19.8065C22.7491 20.1972 22.2192 20.4167 21.6667 20.4167C21.1141 20.4167 20.5842 20.1972 20.1935 19.8065C19.8028 19.4158 19.5833 18.8859 19.5833 18.3333ZM33.3333 16.6667V33.3333H0V16.6667C0 7.5 7.5 0 16.6667 0C25.8333 0 33.3333 7.5 33.3333 16.6667ZM3.33333 16.6667C3.33333 24.0167 9.31667 30 16.6667 30C24.0167 30 30 24.0167 30 16.6667C30 15.35 29.8 14.0833 29.45 12.9C26.2279 13.6494 22.8555 13.4201 19.7645 12.2413C16.6736 11.0625 14.0048 8.98798 12.1 6.28333C10.4667 10.2667 7.35 13.4833 3.41667 15.2333C3.33333 15.7 3.33333 16.1833 3.33333 16.6667ZM11.6667 20.4167C12.2192 20.4167 12.7491 20.1972 13.1398 19.8065C13.5305 19.4158 13.75 18.8859 13.75 18.3333C13.75 17.7808 13.5305 17.2509 13.1398 16.8602C12.7491 16.4695 12.2192 16.25 11.6667 16.25C11.1141 16.25 10.5842 16.4695 10.1935 16.8602C9.80283 17.2509 9.58333 17.7808 9.58333 18.3333C9.58333 18.8859 9.80283 19.4158 10.1935 19.8065C10.5842 20.1972 11.1141 20.4167 11.6667 20.4167Z" fill="#C0C0C0" />
    </svg>
  )
}

const ManIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
      <path d="M11.6667 16.25C11.1141 16.25 10.5842 16.4695 10.1935 16.8602C9.80283 17.2509 9.58333 17.7808 9.58333 18.3333C9.58333 18.8859 9.80283 19.4158 10.1935 19.8065C10.5842 20.1972 11.1141 20.4167 11.6667 20.4167C11.9403 20.4167 12.2112 20.3628 12.4639 20.2581C12.7167 20.1534 12.9464 19.9999 13.1398 19.8065C13.3333 19.613 13.4867 19.3834 13.5914 19.1306C13.6961 18.8778 13.75 18.6069 13.75 18.3333C13.75 18.0597 13.6961 17.7888 13.5914 17.5361C13.4867 17.2833 13.3333 17.0536 13.1398 16.8602C12.9464 16.6667 12.7167 16.5133 12.4639 16.4086C12.2112 16.3039 11.9403 16.25 11.6667 16.25ZM21.6667 16.25C21.1141 16.25 20.5842 16.4695 20.1935 16.8602C19.8028 17.2509 19.5833 17.7808 19.5833 18.3333C19.5833 18.8859 19.8028 19.4158 20.1935 19.8065C20.5842 20.1972 21.1141 20.4167 21.6667 20.4167C22.2192 20.4167 22.7491 20.1972 23.1398 19.8065C23.5305 19.4158 23.75 18.8859 23.75 18.3333C23.75 17.7808 23.5305 17.2509 23.1398 16.8602C22.7491 16.4695 22.2192 16.25 21.6667 16.25ZM16.6667 0C14.478 0 12.3107 0.431096 10.2886 1.26867C8.26652 2.10625 6.4292 3.33391 4.88155 4.88155C1.75595 8.00716 0 12.2464 0 16.6667C0 21.0869 1.75595 25.3262 4.88155 28.4518C6.4292 29.9994 8.26652 31.2271 10.2886 32.0647C12.3107 32.9022 14.478 33.3333 16.6667 33.3333C21.0869 33.3333 25.3262 31.5774 28.4518 28.4518C31.5774 25.3262 33.3333 21.0869 33.3333 16.6667C33.3333 14.478 32.9022 12.3107 32.0647 10.2886C31.2271 8.26652 29.9994 6.4292 28.4518 4.88155C26.9041 3.33391 25.0668 2.10625 23.0447 1.26867C21.0226 0.431096 18.8554 0 16.6667 0ZM16.6667 30C9.31667 30 3.33333 24.0167 3.33333 16.6667C3.33333 16.1833 3.33333 15.7 3.41667 15.2333C7.35 13.4833 10.4667 10.2667 12.1 6.28333C14.0048 8.98798 16.6736 11.0625 19.7645 12.2413C22.8555 13.4201 26.2279 13.6494 29.45 12.9C29.8 14.0833 30 15.35 30 16.6667C30 24.0167 24.0167 30 16.6667 30Z" fill="#C0C0C0" />
    </svg>
  )
}

const OtherIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="40" viewBox="0 0 37 40" fill="none">
      <path d="M35.83 3.74269e-05H29.3217C29.1646 -0.00149811 29.0106 0.0442478 28.8798 0.131333C28.7491 0.218418 28.6475 0.342817 28.5883 0.488371C28.5251 0.634416 28.5069 0.796 28.536 0.952461C28.5651 1.10892 28.6402 1.25315 28.7517 1.3667L30.265 2.88004C30.4317 3.04004 30.4317 3.30504 30.265 3.46504L26.8967 6.89837C26.8237 6.95262 26.7351 6.98192 26.6442 6.98192C26.5532 6.98192 26.4647 6.95262 26.3917 6.89837C24.2774 5.55487 21.7639 4.9831 19.2765 5.27983C16.7891 5.57655 14.4806 6.72355 12.7417 8.5267C6.075 7.4467 0.0233333 12.5784 0 19.33C0.00328832 21.6675 0.76022 23.9417 2.15844 25.8149C3.55666 27.6881 5.52162 29.0605 7.76167 29.7284C7.935 29.7784 8.05333 29.9384 8.05333 30.1184V31.4034C8.05333 31.5112 8.01049 31.6147 7.93422 31.6909C7.85796 31.7672 7.75452 31.81 7.64667 31.81H6.93C6.64267 31.7659 6.3492 31.7845 6.06971 31.8644C5.79021 31.9443 5.5313 32.0837 5.31071 32.273C5.09012 32.4624 4.91306 32.6971 4.79168 32.9613C4.67029 33.2254 4.60745 33.5127 4.60745 33.8034C4.60745 34.0941 4.67029 34.3813 4.79168 34.6455C4.91306 34.9096 5.09012 35.1444 5.31071 35.3337C5.5313 35.523 5.79021 35.6624 6.06971 35.7423C6.3492 35.8223 6.64267 35.8408 6.93 35.7967H7.73C7.95333 35.7967 8.135 35.98 8.135 36.2034V37.0017C8.11236 37.2794 8.14752 37.5588 8.23826 37.8223C8.329 38.0857 8.47335 38.3275 8.6622 38.5324C8.85106 38.7373 9.08032 38.9008 9.33553 39.0126C9.59074 39.1245 9.86636 39.1822 10.145 39.1822C10.4236 39.1822 10.6993 39.1245 10.9545 39.0126C11.2097 38.9008 11.4389 38.7373 11.6278 38.5324C11.8167 38.3275 11.961 38.0857 12.0517 37.8223C12.1425 37.5588 12.1776 37.2794 12.155 37.0017V36.2034C12.1531 36.1083 12.1845 36.0155 12.2439 35.9412C12.3033 35.8669 12.3868 35.8158 12.48 35.7967H13.2933C13.7962 35.7532 14.2645 35.5227 14.6057 35.1507C14.9469 34.7787 15.1362 34.2923 15.1362 33.7875C15.1362 33.2828 14.9469 32.7963 14.6057 32.4244C14.2645 32.0524 13.7962 31.8219 13.2933 31.7784H12.48C12.3735 31.7743 12.2724 31.7301 12.197 31.6547C12.1216 31.5793 12.0775 31.4782 12.0733 31.3717V30.4434C12.0766 30.3463 12.1146 30.2536 12.1803 30.182C12.246 30.1105 12.3352 30.0649 12.4317 30.0534C14.7617 29.7027 16.9175 28.6131 18.5817 26.945C25.2383 27.9417 31.245 22.8384 31.3383 16.1084C31.3633 14.0413 30.7991 12.0098 29.7117 10.2517C29.6561 10.1825 29.6258 10.0963 29.6258 10.0075C29.6258 9.91874 29.6561 9.83261 29.7117 9.76337L33.145 6.33004C33.1823 6.28929 33.2276 6.25671 33.2781 6.23434C33.3285 6.21196 33.3831 6.20029 33.4383 6.20004C33.5483 6.20504 33.6533 6.25004 33.73 6.33004L35.2267 7.8267C35.3404 7.93842 35.4844 8.01427 35.6408 8.04483C35.7972 8.07539 35.9592 8.05931 36.1066 7.99858C36.254 7.93786 36.3802 7.83517 36.4697 7.70327C36.5592 7.57137 36.608 7.41609 36.61 7.2567V0.750037C36.5971 0.550353 36.5099 0.362741 36.3655 0.224211C36.2211 0.0856815 36.03 0.00629222 35.83 0.0017041M21.185 22.9284C21.6794 21.5234 21.8811 20.032 21.7777 18.5462C21.6742 17.0603 21.2677 15.6113 20.5833 14.2884C20.4622 14.0502 20.2951 13.8385 20.0915 13.6654C19.888 13.4923 19.6522 13.3612 19.3977 13.2799C19.1432 13.1986 18.8751 13.1686 18.6089 13.1916C18.3427 13.2146 18.0837 13.2902 17.8469 13.414C17.6101 13.5377 17.4003 13.7073 17.2295 13.9127C17.0587 14.1182 16.9303 14.3555 16.8519 14.6109C16.7734 14.8663 16.7464 15.1347 16.7724 15.4006C16.7984 15.6666 16.8769 15.9247 17.0033 16.16C17.5367 17.16 17.8033 18.28 17.785 19.4134C17.7783 24.6867 12.0667 27.9767 7.50167 25.335C2.93667 22.6934 2.945 16.1017 7.515 13.4684C8.38792 12.9658 9.36114 12.6625 10.365 12.58C9.93343 13.7086 9.69672 14.9022 9.665 16.11C9.6632 18.2533 10.2972 20.3489 11.4867 22.1317C11.7961 22.5431 12.2512 22.8205 12.7586 22.9072C13.2661 22.9939 13.7874 22.8833 14.2159 22.598C14.6444 22.3127 14.9476 21.8743 15.0633 21.3727C15.179 20.8711 15.0985 20.3442 14.8383 19.9C11.915 15.5117 14.8383 9.60337 20.1 9.26504C25.3617 8.9267 29.0167 14.4117 26.68 19.1384C26.1574 20.1948 25.3711 21.0985 24.3971 21.7622C23.4231 22.4258 22.2944 22.8269 21.12 22.9267L21.185 22.9284Z" fill="#C0C0C0" />
    </svg>
  )
}
interface OnboardingStep2Props {
  onNext: () => void
  onSkip: () => void
  onLater: () => void
  onBack?: () => void
  selectedGender: string | null
  onSelectGender: (id: string) => void
}

const genderOptions = [
  { id: 'woman', label: 'Woman', icon: <WomanIcon /> },
  { id: 'man', label: 'Man', icon: <ManIcon /> },
  { id: 'other', label: 'Other', icon: <OtherIcon /> },
]

export default function OnboardingStep2({
  onNext,
  onSkip,
  onLater,
  onBack,
  selectedGender,
  onSelectGender,
}: OnboardingStep2Props) {
  return (
    <div className="flex flex-col relative">
      {/* Back Button - Top Left */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute left-6 top-6 z-10 p-2 text-white/60 hover:text-white transition-colors flex items-center gap-2"
        >
          <ChevronLeftIcon className="size-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
      )}

      {/* Header Section (shared layout with Step 1) */}
      <div className="flex flex-col gap-8 px-8 pt-16">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-1.5">
            <Logo size="lg" />
            <motion.div
              layoutId="onboarding-step-pill"
              className="rounded-full bg-white/10 px-2 py-0.5"
            >
              <span className="text-sm font-normal text-text-secondary  px-2.5 py-1 rounded-full">
                STEP 2/10
              </span>
            </motion.div>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <motion.h2
              layoutId="onboarding-title"
              className="text-center text-lg font-medium leading-[1.56] text-text-primary"
            >
              What brings you to Elara?
            </motion.h2>
            <motion.p
              layoutId="onboarding-subtitle"
              className="max-w-[504px] w-full px-4 md:px-0 text-center text-sm md:text-base font-normal leading-[1.375] text-text-quaternary"
            >
              Whether you&apos;re building a fresh wardrobe or making the most of what
              you already own—we&apos;ll help you shop mindfully and dress with intention.
            </motion.p>
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          {genderOptions.map((option, index) => {
            const isSelected = selectedGender === option.id
            return (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectGender(option.id)}
                className={`relative flex flex-1 flex-row md:flex-col items-center justify-start md:justify-center gap-4 rounded-card border p-4 md:p-6 text-left md:text-center ${isSelected ? 'border-text-primary bg-white/10' : 'border-white/10 bg-white/5'
                  }`}
              >
                {/* Placeholder icon circle */}
                <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-text-primary">
                  <span className="text-sm font-semibold [&>svg]:w-6 [&>svg]:h-6 md:[&>svg]:w-[34px] md:[&>svg]:h-[34px]">
                    {option.icon}
                  </span>
                </div>
                <div className="flex flex-col items-start md:items-center gap-1">
                  <span className="text-base font-medium text-text-primary">
                    {option.label}
                  </span>
                </div>

                {/* Check indicator in top-right when selected */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-text-primary text-background"
                  >
                    <CheckIcon fill="black" className="text-black size-5" />
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between border-t border-[#292929] px-6 py-3">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={onLater}
            className="p-2 text-base font-normal text-text-secondary"
          >
            Setup later
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={onSkip} className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 cursor-pointer">
            Skip
          </Button>
          <Button
            variant="default"
            onClick={onNext}
            disabled={!selectedGender}
            className="px-4 py-2 disabled:opacity-60 disabled:cursor-not-allowed bg-white text-black/80 hover:bg-white/80 hover:text-black/80 cursor-pointer"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}


