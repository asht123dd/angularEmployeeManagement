import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }
  employees: Employee[];
  

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }
  add(name: string, employeeId: number, currentAddress: string, previousAddress1: string, previousAddress2: string, previousAddress3: string, yearsOfExperience: number, graduatedFrom: string, graduateDegree: string, graduationYear: number, intermediateYear: number, matriculationYear: number): void {
    name = name.trim();
    currentAddress = currentAddress.trim();
    previousAddress1=previousAddress1.trim();
    previousAddress2=previousAddress2.trim();
    previousAddress3=previousAddress3.trim();
    graduatedFrom=graduatedFrom.trim();
    graduateDegree=graduateDegree.trim();
    if (!name || !employeeId) { return; }
    const employee: Employee = {
      id :employeeId,
      employeeId: employeeId,
      employeeName: name,
      currentAddress: currentAddress,
      previousAddress1: previousAddress1,
      previousAddress2: previousAddress2,
      previousAddress3: previousAddress3,
      yearsOfExperience: yearsOfExperience,
      graduatedFrom: graduatedFrom,
      graduateDegree: graduateDegree,
      graduationYear: graduationYear,
      intermediateYear: intermediateYear,
      matriculationYear: matriculationYear
    };
    
    
    this.employeeService.addEmployee(employee)
      .subscribe(employee => {
        this.employees.push(employee);
      });
  }
  delete(employee: Employee): void {
    this.employees = this.employees.filter(e => e !== employee);
    this.employeeService.deleteEmployee(employee).subscribe();
  }
}
