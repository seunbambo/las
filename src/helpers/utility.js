
export const ValidateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}