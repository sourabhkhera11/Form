import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
const app = createApp({
    data() {
        return {
            showSignUp: true,
            showProfile: false,
            id:"",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            dob: "",
            city:"",
            gender:"",
            interests: [],
            address: "",
            profiles: [{
                id: "1",
                firstName: "Sourabh",
                lastName: "Khera",
                email: "sourabhkhera@example.com",
                phoneNumber: "9876543210",
                dob: "1995-05-15",
                city:"new delhi",
                gender:"male",
                interests:["sports","music"],
                address:"123 Main Street, New Delh"
            },
        {
                id: "2",
                firstName: "Arjun",
                lastName: "Sharma",
                email: "arjunsharma@example.com",
                phoneNumber: "9123456780",
                dob: "1992-08-22",
                city:"mumbai",
                gender:"male",
                interests:["sports","movie"],
                address:"123 Main Street, Mumbai, Maharashtra 400001"
            }],
            error:{},
            modifyBit: false,
            modifyId:"",
        };
    },
    methods: {
        showSignUpForm() {
            this.showSignUp = true;
            this.showProfile = false;
        },
        showProfileForm() {
            this.showSignUp = false;
            this.showProfile = true;
        },
        handleSubmit() {
            if(this.modifyBit){
                let profile = this.profiles.find(profile => profile.id === this.modifyId);
                profile.firstName = this.firstName;
                profile.lastName = this.lastName;
                profile.email = this.email;
                profile.phoneNumber = this.phoneNumber;
                profile.dob = this.dob;
                profile.city = this.city;
                profile.gender = this.gender;
                profile.interests = this.interests;
                profile.address = this.address;
            }
            else{
                this.profiles.push({
                    id: Date.now().toString(),
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    phoneNumber: this.phoneNumber,
                    dob: this.dob,
                    city: this.city,
                    gender: this.gender,
                    interests: this.interests,
                    address: this.address,
                });
            }
            this.formReset();
            console.log(this.profiles);
        },
        validateForm() {
            this.error={};
            if(!this.firstName){
                this.error.firstName="First Name is required";
            }
            if(!this.lastName){
                this.error.lastName="Last Name is required";
            }
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!this.email){
                this.error.email="Email is required";
            }
            else if(!emailPattern.test(this.email)){
                this.error.email="Invalid email format";
            }
            if(!this.phoneNumber){
                this.error.phoneNumber="Phone Number is required";
            }
            else if(this.phoneNumber.length!==10){
                this.error.phoneNumber="Phone Number must be 10 digits";
            }
            if(!this.dob){
                this.error.dob="Date of Birth is required";
            }
            else if(new Date(this.dob) >= new Date()){
                this.error.dob="Invalid Date of Birth";
            }
            if(!this.city){
                this.error.city="City is required";
            }
            if(!this.gender){
                this.error.gender="Gender is required";
            }
            if(this.interests.length===0){
                this.error.interests="At least one interest must be selected";
            }
            if(!this.address){
                this.error.address="Address is required";
            }
            if(Object.keys(this.error).length===0){
                this.handleSubmit();
            }
        },
        handleDelete(id){
            this.profiles = this.profiles.filter(profile => profile.id !== id);
        },
        handleUpdate(id){
            let profile = this.profiles.find(profile => profile.id === id);
            this.firstName = profile.firstName;
            this.lastName = profile.lastName;
            this.email = profile.email;
            this.phoneNumber = profile.phoneNumber;
            this.dob = profile.dob;
            this.city = profile.city
            this.gender = profile.gender;   
            this.interests = profile.interests;
            this.address = profile.address;
            this.showSignUpForm();
            this.modifyBit = true;
            this.modifyId = id;
        },
        formReset(){
            this.firstName = "";
            this.lastName = "";
            this.email = "";
            this.phoneNumber = "";
            this.dob = "";
            this.city = "";
            this.gender="";
            this.interests = [];
            this.address = "";
            this.modifyBit = false;
            this.modifyId = "";
        }
    },
});
app.mount("#app");