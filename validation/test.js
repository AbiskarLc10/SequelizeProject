class faculty{

    constructor(faculty_name){
        this.faculty = faculty_name
    }

    setCollege(college){
            this.college = college
    }

    getFacultyDetails(){
        return `The name of College is ${this.college} and the faculty is ${this.faculty}`
    }
}

class User extends faculty{

    constructor(user_id,faculty_name){
        super()
        this.id = user_id
    }

    setName(name) {
        this.name = name
       return console.log(`The name of user is set to ${this.name}`)
    }
    getUserDetails(){
        
        console.log(`User Id: ${this.id} Name: ${this.name}`)
        const facdetails = this.getFacultyDetails()
        console.log(facdetails)
        return
    }
}


const user1 = new User(`user0146`,"CSIT")
user1.setName("Abiskar")
user1.setCollege("ASMT")
user1.getUserDetails()