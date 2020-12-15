import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  deferredPrompt: any;
  showGuid = false;
  beforeInstall = false;
  showSpinner = false;
  userChoice = '';

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(e) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.beforeInstall = true;
    this.showSpinner = true;
  }

  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.beforeInstall = false;
    this.showGuid = true;

    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
          this.userChoice = 'App installed, take a look on your desktop';
        } else {
          console.log('User dismissed the A2HS prompt');
          this.userChoice = `That's cool... You don't have to install the app`;
        }
        this.showGuid = false;
        this.showSpinner = false;
        this.deferredPrompt = null;
        window.alert(this.userChoice);
      });
  }
}
