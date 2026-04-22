<<<<<<< HEAD
'use client'

=======
>>>>>>> a335f62af2bdb69c73f13cba647562248247d6ba
import { GitHub, Google } from '@/shared/ui'

import styles from './OAuthIcons.module.scss'

type OAuthIconsProps = {
  onSignInGoogle?: () => void
  onSignInGithub?: () => void
}

// const Google = dynamic(() => import('@/shared/ui').then(m => m.Google), { ssr: false })
// const GitHub = dynamic(() => import('@/shared/ui').then(m => m.GitHub), { ssr: false })

export const OAuthIcons = ({ onSignInGoogle, onSignInGithub }: OAuthIconsProps) => (
  <div className={styles.oauthProviders}>
    <button onClick={onSignInGoogle} type={'button'}>
      <Google size={36} />
    </button>
    <button onClick={onSignInGithub} type={'button'}>
      <GitHub size={36} />
    </button>
  </div>
)
