var gamepadManager = new BABYLON.GamepadManager();

var deviceSourceManager;

const levelConv = {
    'Easy': 1,
    'Intermediate': 2,
    'Difficult': 3
}

class MainMenu extends GameObject {
    constructor() {
        super();
    }

    init() {
        this.visible = true;
        this._isVisible = false;
        this.createMainMenu();
        this.setupInputs();
    }

    onDestroy() {
    }

    update(deltaTime) {
        // Don't do anything here
        if (this._isVisible !== this.visible) {
            this._isVisible = this.visible;
            if (this._isVisible) {
                this.showUI();
            } else {
                this.hideUI();
            }
        }
    }

    onStartGame() {
        if (this.visible) {
            // setLevel(0);
            this.visible = false;
            createObject(new Player());
        }
    }

    setupInputs() {
        deviceSourceManager = new BABYLON.DeviceSourceManager(scene.getEngine());
        /**
         * onDeviceConnectedObservable is fired after a device is connected so any code that we
         * put in here should be able to reliably work against an existing device.
         * 
         * For onInputChangedObservable, this will only work with Mouse, Touch, and Keyboards because
         * the Gamepad API currently does not fire input changed events (polling only)
         */
        deviceSourceManager.onDeviceConnectedObservable.add((deviceSource) => {
            // If Mouse/Touch, add an Observer to change text
            if (deviceSource.deviceType === BABYLON.DeviceType.Mouse || deviceSource.deviceType === BABYLON.DeviceType.Touch) {
                deviceSource.onInputChangedObservable.add((eventData) => {
                    if (eventData.type === 'pointerdown' &&
                        eventData.inputIndex === BABYLON.PointerInput.LeftClick) {
                        this.onStartGame();
                    }
                });
            }
            // If Keyboard, add an Observer to change text
            else if (deviceSource.deviceType === BABYLON.DeviceType.Keyboard) {
                deviceSource.onInputChangedObservable.add((eventData) => {
                    if (eventData.type === 'keydown' &&
                        eventData.key === ' ') {
                        this.onStartGame();
                    }
                });
            }
        });

        // This callback is invoked when a new controller is attached:
        gamepadManager.onGamepadConnectedObservable.add((gamepad, state)=>{
        
            // When a new controller is connected add support for detecting button presses
            gamepad.onButtonDownObservable.add((button, state)=>{
                this.onStartGame();
            });
        });
    }

    createMainMenu() {
        this.hudTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("Menu");
    }

    getGreeting() {
        // Pick a random greeting from the list in constants.js
        let val = Math.floor(Math.random() * greetings.length);
        return greetings[val];
    }

    showUI() {
        let greeting = this.getGreeting();

        // Create a Text Block that can display the current score
        this.welcomeText = new BABYLON.GUI.TextBlock();
        this.welcomeText.text = "Flying Cube Game!";
        this.welcomeText.fontFamily = "Impact";
        this.welcomeText.color = "white";
        this.welcomeText.fontSize = 72;
        this.welcomeText.verticalAlignment = BABYLON.GUI.TextBlock.VERTICAL_ALIGNMENT_TOP;
        this.welcomeText.horizontalAlignment = BABYLON.GUI.TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
        this.welcomeText.width = .5;
        this.welcomeText.height = .6;
        
        this.greetingText = new BABYLON.GUI.TextBlock();
        this.greetingText.text = greeting;
        this.greetingText.fontFamily = "Impact";
        this.greetingText.color = "white";
        this.greetingText.fontSize = 28;
        this.greetingText.verticalAlignment = BABYLON.GUI.TextBlock.VERTICAL_ALIGNMENT_TOP;
        this.greetingText.horizontalAlignment = BABYLON.GUI.TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
        this.greetingText.width = .5;
        this.greetingText.height = .7;

        this.instructionsText = new BABYLON.GUI.TextBlock();
        this.instructionsText.text = "press any key to play";
        this.instructionsText.fontFamily = "Impact";
        this.instructionsText.color = "#aafffa";
        this.instructionsText.fontSize = 32;
        this.instructionsText.verticalAlignment = BABYLON.GUI.TextBlock.VERTICAL_ALIGNMENT_TOP;
        this.instructionsText.horizontalAlignment = BABYLON.GUI.TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
        this.instructionsText.width = .5;
        this.instructionsText.height = .9;
        
        // radio
        this.panel = new BABYLON.GUI.StackPanel();
        // let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(ground, 512, 512);
        // advancedTexture.addControl(this.panel);
        
        // this allows test of diff
        let textblock = new BABYLON.GUI.TextBlock();
        textblock.height = "50px";
        this.panel.addControl(textblock);  
        
        
        var addRadio = function(text, parent) {

        var button = new BABYLON.GUI.RadioButton();
        button.width = "20px";
        button.height = "20px";
        button.color = "white";
        button.background = "green";     

        button.onIsCheckedChangedObservable.add(function(state) {
            if (state) {
                // will show text of level
                // textblock.text = text;
                // will show number of level for switch case
                // textblock.text = levelConv[text];
                // here would set globals
                setLevel(levelConv[text])
            }
        }); 
        
        

        var header = BABYLON.GUI.Control.AddHeader(button, text, "100px", { isHorizontal: true, controlFirst: true });
        header.height = "30px";
        parent.addControl(header);    
    }
        
    
        this.hudTexture.addControl(this.welcomeText);
        this.hudTexture.addControl(this.greetingText);
        this.hudTexture.addControl(this.instructionsText);
        this.hudTexture.addControl(this.instructionsText);
        
        addRadio("Easy", this.panel);
        addRadio("Intermediate", this.panel);
        addRadio("Difficult", this.panel);
        this.hudTexture.addControl(this.panel)
        // addRadio("Intermediate", panel);
        // addRadio("Difficult", panel);
        // this.hudTexture.addControl(this.radioSelectEasy);
    }

    
    hideUI() {
        this.hudTexture.removeControl(this.welcomeText);
        this.hudTexture.removeControl(this.greetingText);
        this.hudTexture.removeControl(this.instructionsText);
        this.hudTexture.removeControl(this.panel)
    }
}

var mainMenu = new MainMenu();
createObject(mainMenu);
mainMenu.visible = true;