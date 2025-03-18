import { SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'

export const LoginForm = () => {
  return (
    <div className="flex gap-5">
      <SignedOut>
        <SignInButton>
          <button className="auth-provider__button">
            Sign in
          </button>
        </SignInButton>

        <SignUpButton>
          <button className="auth-provider__button">
            Sign up
          </button>
        </SignUpButton>
      </SignedOut>
    </div>
  )
}
