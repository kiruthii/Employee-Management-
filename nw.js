const employee=[
    {id:1,name:'Alice',department:'HR',salary:40000,bonusPercentage:10,yearsOfExperience:7 },
    { id: 2, name: 'Bob', department: 'Engineering', salary: 60000, bonusPercentage: 15 },
    { id: 3, name: 'Charlie', department: 'Sales', salary: 50000, bonusPercentage: 10 ,yearsOfExperience:1},
    { id: 2, name: 'Bob', department: 'Engineering', salary: 60000, bonusPercentage: 15 }, 
    { id: 4, name: 'Eve', department: 'Engineering', salary: 70000, bonusPercentage: 15,yearsOfExperience:3 },
    { id: 5, name: 'John', department: 'Sales', salary: 90000, bonusPercentage: 20 },
    { id: 6, name: 'Sara', department: 'HR', salary: 55000, bonusPercentage: 10 },
];

const salesTargets = [
    { id: 1, sales: 200000 }, 
    { id: 2, sales: 1500000 }, 
    { id: 3, sales: 6000000 }, 
  ];

function removeDuplicate(emp){
    const uArray=[];
    const rEmp=new Set();
    for(const em of emp){
        if(!rEmp.has(em.id)){
            rEmp.add(em.id);
            uArray.push(em);
        }
    }
    return uArray;
}



function filEmpByDep(department) {
    return employee.filter(employee => employee.department === department);
  }


function calculateTotalCompensation(employee) {
    let bonus = 0;
    switch (employee.department) {
      case 'HR':
        if (employee.salary < 50000) {
          bonus = employee.salary * 0.10; 
        }
        break;
      case 'Engineering':
        if (employee.yearsOfExperience > 2) {
          bonus = employee.salary * 0.15;
        }
        break;
      case 'Sales':
        const salesData = salesTargets.find(target => target.id === employee.id);
        if (salesData) {
          if (salesData.sales < 100000) {
            bonus = employee.salary * 0.05;
          } else if (salesData.sales >= 100000 && salesData.sales <= 500000) {
            bonus = employee.salary * 0.10;
          } else if (salesData.sales > 500000) {
            bonus = employee.salary * 0.20;
          }
        }
        break;
      default:
        bonus = 0;
    }
  
    const totalCompensation = employee.salary + bonus;
    return { bonus, totalCompensation };
  }





function generateReport(department) {
    const filteredEmployees = filEmpByDep(department);
    const uniqueEmployees = removeDuplicate(filteredEmployees);
    
    const report = {};
    const updatedEmployees = [];
  
    for (const employee of uniqueEmployees) {
      const { bonus, totalCompensation } = calculateTotalCompensation(employee);
      employee.bonus = bonus;
      employee.totalCompensation = totalCompensation;
      updatedEmployees.push(employee);
  
     
      if (!report[employee.department]) {
        report[employee.department] = [];
      }
      report[employee.department].push({
        name: employee.name,
        salary: employee.salary,
        bonus: employee.bonus,
        totalCompensation: employee.totalCompensation,
      });
    }
  
    return { report, updatedEmployees };
  }



const department = 'Engineering';
const result = generateReport(department);
console.log('Employee Report:');
console.log(result.report);
console.log('Updated Employee List:');
console.log(result.updatedEmployees);
