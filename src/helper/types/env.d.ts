export {}

declare global {
    namespace NodeJS{
        interface ProcessEnv{
            BROWSER: "chrome" | "firefox" | "webkit",
            ENV: "staging" | "prod" | "teste",
            BASEURL: string,
            LOGINURL: string,
            REGISTERURL:string,
            HEAD: "true" | "false"
        }
    }
}