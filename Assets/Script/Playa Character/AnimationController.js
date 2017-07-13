#pragma strict

var lastAnimationKeyPressed;

var running : System.Boolean;
var ballForm : System.Boolean;
var aimUp : System.Boolean;
var aimDown : System.Boolean;
var facingRight : System.Boolean;

var xMovement;

function Start () {
	running = false;
	ballForm = false;
	aimUp = false;
	aimDown = false;
	facingRight = true;
}

function Update () {
	xMovement = gameObject.GetComponent(CharacterMovement).xMovement;
	if (xMovement != Vector3.zero) {
		DetermineFacingDirection();
	};
};

function DetermineFacingDirection() {
	switch (xMovement) {
	case (Vector3.right):
		facingRight = true;
		break;
	default:
		facingRight = false;
	};
};