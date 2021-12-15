import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'

// import { generateOrderLink } from '@/common/utils'

const AuthRequiredShell = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}

export default AuthRequiredShell
