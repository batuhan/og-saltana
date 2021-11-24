import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'
import { GetServerSideProps } from 'next'
import CreatorOnboardingShell from '../../../components/Dashboard/Creator/Onboarding/Shell'
const Link = ({ to, children, ...props }) => (
  <a href={`${to}`} {...props}>
    {children}
  </a>
)
function CreatorOnboarding() {
  return (
    <CreatorOnboardingShell>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl text-gray-800 font-bold mb-6">
          Tell us what’s your situation ✨
        </h1>
        {/* Form */}
        <form>
          <div className="space-y-3 mb-8">
            <label className="relative block cursor-pointer focus-within:outline-blue">
              <input
                type="radio"
                name="radio-buttons"
                className="peer sr-only"
                defaultChecked
              />
              <div className="flex items-center bg-white text-sm font-medium text-gray-800 p-4 rounded border border-gray-200 hover:border-gray-300 shadow-sm duration-150 ease-in-out">
                <svg
                  className="w-6 h-6 flex-shrink-0 fill-current mr-4"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="text-indigo-500"
                    d="m12 10.856 9-5-8.514-4.73a1 1 0 0 0-.972 0L3 5.856l9 5Z"
                  />
                  <path
                    className="text-indigo-300"
                    d="m11 12.588-9-5V18a1 1 0 0 0 .514.874L11 23.588v-11Z"
                  />
                  <path
                    className="text-indigo-200"
                    d="M13 12.588v11l8.486-4.714A1 1 0 0 0 22 18V7.589l-9 4.999Z"
                  />
                </svg>
                <span>I have a company</span>
              </div>
              <div
                className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none"
                aria-hidden="true"
              ></div>
            </label>
            <label className="relative block cursor-pointer focus-within:outline-blue">
              <input
                type="radio"
                name="radio-buttons"
                className="peer sr-only"
              />
              <div className="flex items-center bg-white text-sm font-medium text-gray-800 p-4 rounded border border-gray-200 hover:border-gray-300 shadow-sm duration-150 ease-in-out">
                <svg
                  className="w-6 h-6 flex-shrink-0 fill-current mr-4"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="text-indigo-500"
                    d="m12 10.856 9-5-8.514-4.73a1 1 0 0 0-.972 0L3 5.856l9 5Z"
                  />
                  <path
                    className="text-indigo-300"
                    d="m11 12.588-9-5V18a1 1 0 0 0 .514.874L11 23.588v-11Z"
                  />
                </svg>
                <span>I’m a freelance / contractor</span>
              </div>
              <div
                className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none"
                aria-hidden="true"
              ></div>
            </label>
            <label className="relative block cursor-pointer focus-within:outline-blue">
              <input
                type="radio"
                name="radio-buttons"
                className="peer sr-only"
              />
              <div className="flex items-center bg-white text-sm font-medium text-gray-800 p-4 rounded border border-gray-200 hover:border-gray-300 shadow-sm duration-150 ease-in-out">
                <svg
                  className="w-6 h-6 flex-shrink-0 fill-current mr-4"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="text-indigo-500"
                    d="m12 10.856 9-5-8.514-4.73a1 1 0 0 0-.972 0L3 5.856l9 5Z"
                  />
                </svg>
                <span>I’m just getting started</span>
              </div>
              <div
                className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none"
                aria-hidden="true"
              ></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <Link
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto"
              to="/onboarding-02"
            >
              Next Step -&gt;
            </Link>
          </div>
        </form>
      </div>
    </CreatorOnboardingShell>
  )
}

export const getServerSideProps: GetServerSideProps = getServerSidePropsForCreatorDashboardPages()
// export const getServerSideProps: GetServerSideProps = requireSession(async ({ req, res }) => {
//   debugger
//   const session = await getSession({ req })
//   if (!session) {
//     res.statusCode = 403
//     return {
//       redirect: {
//         destination: `/login`,
//         permanent: false, // @TODO: This should be true
//       },
//     }
//   }

//   const instance = await getSaltanaInstance(session)

//   const userData = await instance.users.read(session.user.id)

//   const finishedOnboarding = _.get(userData.platformData, '_private.finishedOnboarding', false)
//   const roles = _.get(userData, 'roles', [])
//   const isCreator = roles.includes('provider')

//   if (isCreator === false) {
//     return {
//       redirect: {
//         destination: '/request-invite',
//         permanent: false,
//       },
//     }
//   }

//   if (
//     finishedOnboarding === true
//   ) {
//     return {
//       redirect: {
//         destination: `/dashboard`,
//         permanent: false, // @TODO: This should be true
//       },
//     }
//   }

//   return {
//     props: {
//       userData
//     },
//   }
// })

export default CreatorOnboarding
