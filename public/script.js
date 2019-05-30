
let app = new Vue ({
    
    el:'#root',
    components: {
        apexchart: VueApexCharts,
      },
    data:{
        income: [],
        incomeDesc: '',
        incomeNum: 0,
        totalIncome: 0,

        expenses: [],
        expenseDesc: '',
        expenseNum: 0,
        totalExpense: 0,

        diff : 0,
        names: ['Rent', 'Bills and Debt', 'Food', 'Transportation', 'Education', 'Entertainment', 'Other'],
        chartData: [['Rent', 10], ['Bills and Debt', 20], ['Food', 0], ['Transportation', 0], ['Education', 0], ['Entertainment', 0], ['Other', 0]],
        name: '',
        
        message: '',
        series: [44, 55, 13, 43, 22, 14, 33],
        chartOptions: {
          labels: ['Rent', 'Bills and Debt', 'Food', 'Transportation', 'Education', 'Entertainment', 'Other'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
    },
    methods:{

        financialStatus() {
            if(this.diff >= 100){
                this.message = "You're financially stable";
            }
            else if(20 < this.diff && this.diff < 100){
                this.message = "Take caution in spending!";
            }
            else{
                this.message = "You're Poor";
            }
        },
        addIncome() {
            if(this.incomeDesc == '' || this.incomeNum == ''){
                return;
            }
          this.income.push({title: this.incomeDesc, amount: this.incomeNum});

          this.incomeDesc = '';
          this.totalIncome = parseInt(this.totalIncome) + parseInt(this.incomeNum);
          this.diff = this.totalIncome - this.totalExpense;
          this.financialStatus();
          this.incomeNum = '';
          
        },
        addExpenses() {
            if(this.expenseDesc == '' || this.expenseNum == ''){
                return;
            }
          this.expenses.push({title: this.expenseDesc, amount: this.expenseNum, category: this.name});
          this.totalExpense = parseInt(this.totalExpense) + parseInt(this.expenseNum);

        for(var i = 0; i < this.chartData.length; i++){
            if(this.chartData[i][0] == this.name) {
                this.chartData[i][1] = parseInt(this.chartData[i][1]) + parseInt(this.expenseNum);
            }
        }
        this.diff = this.totalIncome - this.totalExpense;
        this.financialStatus();
          this.expenseDesc = '';
          this.expenseNum = '';
          this.name = '';

        },

    },
    
});