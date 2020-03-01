const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../database/models');
const bcrypt = require('bcrypt');

module.exports = passport => {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function(id, done) {
        const user = await User.findOne({
            attributes: ['id', 'name', 'last_name'],
            where: {
                id,
            },
        });

        if (user) {
            return done(null, user);
        }
        return done(null, null);
    });

    passport.use(
        new LocalStrategy(async function(username, password, done) {
            const user = await User.findOne({
                attributes: ['id', 'name', 'last_name', 'password'],
                where: {
                    email: username,
                },
            });

            if (!user) {
                return done(null, false);
            }

            const password_check = bcrypt.compareSync(password, user.password);

            if (!password_check) {
                return done(null, false);
            }

            return done(null, {
                id: user.id,
                name: user.name,
                last_name: user.last_name,
            });
        })
    );
};
