import s from "./SocialButtons.module.scss"

import googleIcon from "@/shared/assets/icons/google.svg"
import appleIcon from "@/shared/assets/icons/apple.svg"
import facebookIcon from "@/shared/assets/icons/facebook_logo.svg"

interface SocialProvider {
  id: string
  name: string
  iconSrc: string
}

const PROVIDERS: SocialProvider[] = [
  { id: "google", name: "Google", iconSrc: googleIcon },
  { id: "apple", name: "Apple", iconSrc: appleIcon },
  { id: "facebook", name: "Facebook", iconSrc: facebookIcon },
]

export const SocialButtons = () => {
  const handleSocialClick = (providerId: string) => {
    console.log(`Login with ${providerId}`)
  }

  return (
    <div className={s.socialGroup}>
      {PROVIDERS.map(({ id, name, iconSrc }) => (
        <button
          key={id}
          type="button"
          className={s.socialGroup__button}
          onClick={() => handleSocialClick(id)}
          aria-label={`Sign in with ${name}`}
        >
          <img
            src={iconSrc}
            alt={name}
            width={32}
            height={32}
            className={s.socialGroup__img}
            loading="lazy"
          />
          <span className={s.socialGroup__text}>{name}</span>
        </button>
      ))}
    </div>
  )
}
