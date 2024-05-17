export default function emailValidator(email) {
    const reg = /\S+@\S+\.\S+/
    if (!email) return "Email can`t be empty"
    if (!reg.test(email)) return "Ooops! We need a valid email address"
    return ""
}
