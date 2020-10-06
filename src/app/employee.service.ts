import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { EMPLOYEES } from './mock-employees';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private employeeServerUrl = 'http://localhost:8091/';  // URL to web api
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  getEmployees(): Observable<Employee[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('EmployeeService: fetched employees');
    return of(EMPLOYEES);
  }
  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeeServerUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      tap(_ => this.log(`fetched employee Id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployee employeeId=${id}`))
    );
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`EmployeeService: ${message}`);
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  /** PUT: update the hero on the server */
  updateEmployee(employee: Employee): Observable<any> {
    const url = `${this.employeeServerUrl}/${employee.employeeId}`;
    this.log('url=' + url + 'employee=' + employee);
    return this.http.put(url, employee, this.httpOptions).pipe(
      tap(_ => this.log(`updated employeeId=${employee.employeeId}`)),
      catchError(this.handleError<any>('updateEmployee'))
    );
  }
  /** POST: add a new hero to the server */
  addEmployee(employee: Employee): Observable<Employee> {
    const url = `${this.employeeServerUrl}/${employee.employeeId}`;
    return this.http.post<Employee>(url, employee, this.httpOptions).pipe(
      tap((newEmployee: Employee) => this.log(`added employee w/ id=${newEmployee.employeeId}`)),
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }
  /** DELETE: delete the hero from the server */
deleteEmployee(employee: Employee | number): Observable<Employee> {
  const id = typeof employee === 'number' ? employee : employee.employeeId;
  const url = `${this.employeeServerUrl}/`+id;
  this.log('url=' + url + 'employeeId=' + id);
  return this.http.delete<Employee>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted employee id=${id}`)),
    catchError(this.handleError<Employee>('deleteEmployee'))
  );
}
}
