module.exports = {
  checkOnboardingStatus: {
    name: '[Update] Check onboarding status',
    description: 'Checks if all the necessary information filled and marks onboarding status',
    event: 'user__updated',
    context: ['saltana'],
    computed: {
      canOnboardAsCreator: 'user.roles.includes("provider")',
      isAlreadyOnboarded: '_.get(user, "platformData._private.finishedOnboarding", false)',
      completedRequiredInformation: 'user.firstname && user.lastname && user.username && user.description',
      userId: 'user.id',
      displayName: 'user.displayName ? user.displayName : user.firstname + " " + user.lastname'
    },
    run: [
      {
        endpointMethod: 'PATCH',
        endpointUri: '/users/${computed.userId}',
        stop: '!computed.canOnboardAsCreator || !computed.isAlreadyOnboarded || !computed.completedRequiredInformation',
        endpointPayload: {
          displayName: 'computed.displayName',
          platformData: {
            _private: {
              finishedOnboarding: true
            },
            instant: {
              approvedCreator: true
            }
          }
        }
      }
    ]
  },
}
