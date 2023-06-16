const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

window.addEventListener('beforeinstallprompt', (event) => {

    // store events
    window.deferredPrompt = event;
    
    // remove btn class
    butInstall.classList.toggle('hidden', false);

});

butInstall.addEventListener('click', async () => {

    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
     return;
    }

    promptEvent.prompt();
    
    // reset the deferred prompt var
    window.deferredPrompt = null;
    
    butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
