import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/models';
import { tap, switchMap } from 'rxjs/operators'
@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.css']
})
export class SyncComponent implements OnInit {

  waiting = false;
  order: Order;
  form: FormGroup = this.formBuilder.group({
    pickupPerson: ['', [Validators.required]],
    items: ['', [Validators.required]]
  })
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  submit() {
    this.waiting = true;
    this.http.post<Order>('http://localhost:1337/curbsideorders/sync', this.form.value).pipe(
      tap(response => this.order = response),
      tap(() => this.waiting = false),
      tap(() => this.form.reset())
    ).subscribe();
  }

}
