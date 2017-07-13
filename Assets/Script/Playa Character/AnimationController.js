#pragma strict

// Temporary Input binds, change when input manager has been figured out.
var leftKey = "left";
var rightKey = "right";
var jumpKey = "space";
var ballKey = "f";
var upKey = "up";
var downKey = "down";
var interactKey = "e";
var schuutKey = "z";

// Animation Control Variables
var idleing : System.Boolean;
var running : System.Boolean;
var dashing : System.Boolean;
var ballForm : System.Boolean;
var idleBallForm : System.Boolean;
var lookUp : System.Boolean;
var lookDown : System.Boolean;
var aimUp : System.Boolean;
var aimDown : System.Boolean;
var facingRight : System.Boolean;
var jumping : System.Boolean;
var falling : System.Boolean;
var inFight : System.Boolean;

// Animation Control Triggers
var currentVelocity : Vector3;


function Start() {
	idleing = true;
	running = false;
	jumping = false;
	falling = false;
	ballForm = false;
	aimUp = false;
	aimDown = false;
	facingRight = true;
}

function Update() {
	DetermineKeyPress();
	CheckForFall();
	RunningAnimationControl();
	transform.rotation = Quaternion.Euler(0,Input.GetAxis("Horizontal")*-30,0);
}

function FixedUpdate() {
}

function LateUpdate() {
}

function DetermineKeyPress() {
	if (Vector3(Input.GetAxis("Horizontal"),0,0) == Vector3.right) {
	    facingRight=true;
	}
	else if (Vector3(Input.GetAxis("Horizontal"),0,0) == Vector3.left) {
	    facingRight=false;
	}
	else if (Input.GetKeyDown(jumpKey) === true) {
	    jumping=true;
	    idleing = false;
	}
	else if (Input.GetKeyDown(ballKey) === true) {
	    if (ballForm === false) {
	        ballForm = true;
	        idleing = false; //replace with transition function
	    }
	    if (ballForm === true) {
	        ballForm = false;
	        idleing = true; //replace with transition function
	    }
	}
	else if (Vector3(0,Input.GetAxis("Vertical"),0) == Vector3.up) {
	    if (inFight === true) {
	        aimUp=true;
	        idleing = false;
	    } else {
	        lookUp=true;
	        idleing = false;
	    }
	}
	else if (Vector3(0,Input.GetAxis("Vertical"),0) == Vector3.down) {
	    if (inFight === true) {
	        aimDown=true;
	        idleing = false;
	    } else {
	        lookDown=true;
	        idleing = false;
	    }
	}
	else if (Input.GetKeyDown(interactKey) === true) {
	    facingRight=true;
	    idleing = false;
	}else{
	    idleing = true;
	    aimUp=false;
	    lookUp=false;
	    aimDown=false;
	    lookDown=false;
	}
}

function OnFloor() {
	jumping = false;
	falling = false;
}

function CheckForFall() {
	currentVelocity = GameObject.Find("Character Model").GetComponent(CharacterMovement).currentVelocity;
	if (currentVelocity.y <= -0.1) {
		falling = true;
	}
}

function RunningAnimationControl() {
	currentVelocity = GameObject.Find("Character Model").GetComponent(CharacterMovement).currentVelocity;
	if (Mathf.Abs(currentVelocity.x) > 0) {
		idleing = false;
		running = true;
		dashing = false;
		if (Mathf.Abs(currentVelocity.x) > 0.06) {
			running = false;
			dashing = true;			
		} else {
		idleing = true;
		running = false;
		dashing = false;
		}
	}
}








