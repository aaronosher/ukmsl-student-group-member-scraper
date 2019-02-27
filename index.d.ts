declare module 'ukmsl-student-group-member-scraper' {
  function fetchMembers(config: any): Promise<UKMSLMember[]>;

  interface UKMSLConfig {
    baseUrl: string,
    domain: string,
    groupId: number,
    ASPNET_SessionId: string,
    ASPXAUTH: string,
    AntiXsrfToken: string,
    formBody: string
  }

  interface UKMSLMember {
    name: string,
    id: string,
  }

  export default fetchMembers;
  export { UKMSLConfig, UKMSLMember };
}