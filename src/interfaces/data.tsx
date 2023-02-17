// interfaces are objects. Always define inner objects first (Entries)

export default interface Entries {
    date: string,
    duration: string[],
    away: number
}

interface Users {
    username: string,
    password: string,
    projects: string[], // array of strings
    entries: Entries[], // array of objects
}

export default interface Data {
    users: Users[],
}