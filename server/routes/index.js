const chat = require('./chat')
const doctors = require('./doctors')
const patients = require('./patients')
const professions = require('./professions')
const invitations = require('./invitations')
const login = require('./login')

module.exports = {
    doctors,
    patients,
    professions,
    chat,
    invitations,
    login
}