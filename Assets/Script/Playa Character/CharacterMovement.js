#pragma strict

// Temporary Input binds, change when input manager has been figured out.
var leftKey = "left";
var rightKey = "right";
var jumpKey = "space";
var ballKey;
var upKey;
var downKey;
var interactKey = "e";

// Movement Startup variables
var xSpeed : float;
var jumpHeight : float;
var slopeSteepness : float;
var jitterHeight : float;

//Movement intermediatry and Output variables
var xMovement : Vector3;
var yMovement : Vector3;
var onFloor : System.Boolean;

//Calculate velocity
var oldPosition : Vector3;
var newPosition : Vector3;
var currentVelocity : Vector3;


function Start () {
	xSpeed = 4;
	jumpHeight = 4;
	slopeSteepness = 60;
	jitterHeight = 4 * Mathf.Tan(60);
	DirectionVector();
}

function Update () {
	xMovement = Vector3(Input.GetAxis("Horizontal"),0,0);
	yMovement = Vector3(0,jitterHeight,0);
	transform.position += yMovement * Time.deltaTime;
	transform.position += xMovement * xSpeed * Time.deltaTime;
}

function FixedUpdate() {
	DirectionVector();
}

function LateUpdate() {
	yMovement = Vector3(0,jitterHeight,0);
	transform.position -= yMovement * Time.deltaTime;
}	

function OnCollisionEnter (collision : Collision){
	if(collision.gameObject.name == "Floor"){
		onFloor = true;
		GetComponent(AnimationController).OnFloor();
	}
}function OnCollisionExit (collision : Collision){
    if(collision.gameObject.name == "Floor"){
		onFloor = false;
	}
}

function DirectionVector() {
	oldPosition = transform.position;
	yield WaitForSeconds(1);
	newPosition = transform.position;
	currentVelocity = newPosition - oldPosition;
}