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
var lastKeyPressed;
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
	AnimationVariableChanger();
	CheckForFall();
}

function LateUpdate() {
	lastKeyPressed = "undefined";
}

function DetermineKeyPress() {
	if (Vector3(Input.GetAxis("Horizontal"),0,0) == Vector3.right) {
		lastKeyPressed = rightKey;
	}
	if (Vector3(Input.GetAxis("Horizontal"),0,0) == Vector3.left) {
		lastKeyPressed = leftKey;
	}
	if (Input.GetKeyDown(jumpKey) === true) {
		lastKeyPressed = jumpKey;
	}
	if (Input.GetKeyDown(ballKey) === true) {
		lastKeyPressed = ballKey;
	}
	if (Vector3(0,Input.GetAxis("Vertical"),0) == Vector3.up) {
		lastKeyPressed = upKey;
	}
	if (Vector3(0,Input.GetAxis("Vertical"),0) == Vector3.down) {
		lastKeyPressed = downKey;
	}
	if (Input.GetKeyDown(interactKey) === true) {
		lastKeyPressed = interactKey;
	}
AnimationVariableChanger();
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

function AnimationVariableChanger() {
	switch (lastKeyPressed) {
		case rightKey:
			facingRight=true;
			break;
		case leftKey:
			facingRight=false;
			break;
		case jumpKey:
			jumping=true;
			idleing = false;
			break;
		case ballKey:
			if (ballForm === false) {
				ballForm = true;
				idleing = false; //replace with transition function
			}
			if (ballForm === true) {
				ballForm = false;
				idleing = true; //replace with transition function
			}
			break;
		case upKey:
			if (inFight === true) {
				aimUp=true;
				idleing = false;
			} else {
				lookUp=true;
				idleing = false;
			}
			break;
		case downKey:
			if (inFight === true) {
				aimDown=true;
				idleing = false;
			} else {
				lookDown=true;
				idleing = false;
			}
			break;
		case interactKey:
			facingRight=true;
			idleing = false;
			break;
		default:
			idleing = true;
			aimUp=false;
			lookUp=false;
			aimDown=false;
			lookDown=false;
	}
}