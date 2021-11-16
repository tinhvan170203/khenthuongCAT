const localStrategy = require('passport-local').Strategy;
const passport = require('passport')

function initialize(passport, user, password1) {
    passport.use(new localStrategy(
        (username, password, done) => { //các tên - name trường cần nhập, đủ tên trường thì Done 
            if (username == user) { //kiểm tra giá trị trường có name là username
                if (password == password1) { // kiểm tra giá trị trường có name là password
                    return done(null, username); //trả về username
                } else {
                    return done(null, false); // chứng thực lỗi
                }
            } else {
                return done(null, false); //chứng thực lỗi
            }
        }
    ))
    passport.serializeUser((username, done) => {
        done(null, username);
    })
    passport.deserializeUser((name, done) => {
        //tại đây hứng dữ liệu để đối chiếu
        if (name == 'user') { //tìm xem có dữ liệu trong kho đối chiếu không
            return done(null, name)
        } else {
            return done(null, false)
        }
    });
}

module.exports = initialize