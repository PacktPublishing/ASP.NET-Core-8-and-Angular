import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ConnectionService, ConnectionServiceOptions, ConnectionState } from 'ng-connection-service';
import { Subscription, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'WorldCities';

  currentState!: ConnectionState;
  subscription = new Subscription();

  constructor(private authService: AuthService,
    private connectionService: ConnectionService) { }

  ngOnInit(): void {
    this.authService.init();
    const options: ConnectionServiceOptions = {
      enableHeartbeat: true,
      heartbeatUrl: environment.baseUrl + 'api/heartbeat',
      heartbeatInterval: 10000
    }
    this.subscription.add(
      this.connectionService.monitor(options).pipe(
        tap((newState: ConnectionState) => {
          this.currentState = newState;
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public isOnline() {
    return this.currentState.hasNetworkConnection && this.currentState.hasInternetAccess;
  }
}
