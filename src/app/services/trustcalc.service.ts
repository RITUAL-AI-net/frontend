import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://130.60.156.180:8000/api/user';

const solutionUrl = 'https://130.60.156.180:8000/api/solution';
const analyzeUrl = 'https://130.60.156.180:8000/api/analyze';
const compareUrl = 'https://130.60.156.180:8000/api/compare';
const dashboardUrl = 'https://130.60.156.180:8000/api/dashboard';
const authUrl = 'https://130.60.156.180:8000/api/auth';
const userpageUrl = 'https://130.60.156.180:8000/api/userpage';
const setuserUrl = 'https://130.60.156.180:8000/api/setuser';
const scenarioUrl = 'https://130.60.156.180:8000/api/scenario';
const solutionDetailUrl = 'https://130.60.156.180:8000/api/solution_detail';

@Injectable({
  providedIn: 'root'
})
export class trustcalcService {

  constructor(private https: HttpClient) { }

  login(data): Observable<any> {
    return this.https.get(authUrl, { params: data });
  }

  getAll(): Observable<any> {
    return this.https.get(baseUrl);
  }

  getUser(email): Observable<any> {
    return this.https.get(`${setuserUrl}/${email}`);
  }

  updateUser(data): Observable<any> {
    return this.https.post(setuserUrl, data);
  }

  get(email): Observable<any> {
    return this.https.get(`${baseUrl}/${email}`);
  }

  dashboard(email): Observable<any> {
    return this.https.get(`${dashboardUrl}/${email}`);
  }

  create(data): Observable<any> {
    return this.https.post(scenarioUrl, data);
  }

  uploadsolution(data): Observable<any> {
    return this.https.post(solutionUrl, data);
  }

  register(data): Observable<any> {
    return this.https.post(authUrl, data);
  }

  getsolution(email): Observable<any> {
    return this.https.get(`${solutionUrl}/${email}`);
  }

  analyzesolution(data): Observable<any> {
    return this.https.post(analyzeUrl, data);
  }

  userpageUrl(email): Observable<any> {
    return this.https.get(`${userpageUrl}/${email}`);
  }

  userdetails(data): Observable<any> {
    return this.https.post(userpageUrl, data);
  }

  comparesolution(data): Observable<any> {
    return this.https.post(compareUrl, data);
  }

  update(email, data): Observable<any> {
    return this.https.put(`${baseUrl}/${email}`, data);
  }

  getScenario(scenarioId): Observable<any> {
    return this.https.get(`${scenarioUrl}/${scenarioId}`);
  }

  getScenarioList(email): Observable<any> {
    return this.https.get(`${scenarioUrl}/${email}`);
  }

  updateScenario(data): Observable<any> {
    return this.https.put(scenarioUrl, data);
  }

  deleteSenario(scenarioId): Observable<any> {
    return this.https.delete(`${scenarioUrl}/${scenarioId}`);
  }

  getSolution(id): Observable<any> {
    return this.https.get(`${solutionDetailUrl}/${id}`);
  }

  getSolutionList(email): Observable<any> {
    return this.https.get(`https://130.60.156.180:8000/api/solution_list/${email}`);
  }

  updateSolution(data): Observable<any> {
    return this.https.put(solutionDetailUrl, data);
  }

  deleteSolution(id): Observable<any> {
    return this.https.delete(`${solutionDetailUrl}/${id}`);
  }
}
