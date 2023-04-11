import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://130.60.156.180:8000/api/user';
const solutionUrl = 'http://130.60.156.180:8000/api/solution';
const analyzeUrl = 'http://130.60.156.180:8000/api/analyze';
const compareUrl = 'http://130.60.156.180:8000/api/compare';
const dashboardUrl = 'http://130.60.156.180:8000/api/dashboard';
const authUrl = 'http://130.60.156.180:8000/api/auth';
const userpageUrl = 'http://130.60.156.180:8000/api/userpage';
const setuserUrl = 'http://130.60.156.180:8000/api/setuser';
const scenarioUrl = 'http://130.60.156.180:8000/api/scenario';
const solutionDetailUrl = 'http://130.60.156.180:8000/api/solution_detail';

@Injectable({
  providedIn: 'root'
})
export class trustcalcService {

  constructor(private http: HttpClient) { }

  login(data): Observable<any> {
    return this.http.get(authUrl, { params: data });
  }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getUser(email): Observable<any> {
    return this.http.get(`${setuserUrl}/${email}`);
  }

  updateUser(data): Observable<any> {
    return this.http.post(setuserUrl, data);
  }

  get(email): Observable<any> {
    return this.http.get(`${baseUrl}/${email}`);
  }

  dashboard(email): Observable<any> {
    return this.http.get(`${dashboardUrl}/${email}`);
  }

  create(data): Observable<any> {
    return this.http.post(scenarioUrl, data);
  }

  uploadsolution(data): Observable<any> {
    return this.http.post(solutionUrl, data);
  }

  register(data): Observable<any> {
    return this.http.post(authUrl, data);
  }

  getsolution(email): Observable<any> {
    return this.http.get(`${solutionUrl}/${email}`);
  }

  analyzesolution(data): Observable<any> {
    return this.http.post(analyzeUrl, data);
  }

  userpageUrl(email): Observable<any> {
    return this.http.get(`${userpageUrl}/${email}`);
  }

  userdetails(data): Observable<any> {
    return this.http.post(userpageUrl, data);
  }

  comparesolution(data): Observable<any> {
    return this.http.post(compareUrl, data);
  }

  update(email, data): Observable<any> {
    return this.http.put(`${baseUrl}/${email}`, data);
  }

  getScenario(scenarioId): Observable<any> {
    return this.http.get(`${scenarioUrl}/${scenarioId}`);
  }

  getScenarioList(email): Observable<any> {
    return this.http.get(`${scenarioUrl}/${email}`);
  }

  updateScenario(data): Observable<any> {
    return this.http.put(scenarioUrl, data);
  }

  deleteSenario(scenarioId): Observable<any> {
    return this.http.delete(`${scenarioUrl}/${scenarioId}`);
  }

  getSolution(id): Observable<any> {
    return this.http.get(`${solutionDetailUrl}/${id}`);
  }

  getSolutionList(email): Observable<any> {
    return this.http.get(`http://130.60.156.180:8000/api/solution_list/${email}`);
  }

  updateSolution(data): Observable<any> {
    return this.http.put(solutionDetailUrl, data);
  }

  deleteSolution(id): Observable<any> {
    return this.http.delete(`${solutionDetailUrl}/${id}`);
  }
}
