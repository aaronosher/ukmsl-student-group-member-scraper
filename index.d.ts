declare module 'ukmsl-student-group-member-scraper' {
  function fetchMembers(config: any): Promise<UKMSLMember[]>;

  interface UKMSLConfig {
    baseUrl: String,
    domain: String,
    groupId: number,
    ASPNET_SessionId: String,
    ASPXAUTH: String,
    AntiXsrfToken: String,
    formBody: String
  }

  interface UKMSLMember {
    name: String,
    id: String,
  }

  export default fetchMembers;
  export { UKMSLConfig, UKMSLMember };
}