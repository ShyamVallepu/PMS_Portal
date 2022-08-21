export class PensionerInput {
    constructor(
        public name: String,
        public dateOfbirth: Date,
        public pan: String,
        public salaryEarned: Number,
        public allowances: Number,
        public aadharNumber: String,
        public pensionType: Number,
        public bankName: String,
        public accountNumber: String,
        public bankType: Number
    ) { }
}
