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
	PerSecondTimer();
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

function PerSecondTimer() {
	yield WaitForSeconds (1);
}
	

function OnCollisionEnter (collision : Collision){
	if(collision == gameObject.Find("Floor").GetComponent.<BoxCollider>()){
		onFloor = true;
		xSpeed = 100;
		GameObject.Find("Character Model").GetComponent(AnimationController).OnFloor();
	}
}function OnCollisionExit (collision : Collision){
	if(collision == gameObject.Find("Floor").GetComponent.<BoxCollider>()){
		onFloor = false;
		xSpeed = 4;
	}
}

function DirectionVector() {
	oldPosition = transform.position;
	yield PerSecondTimer();
	newPosition = transform.position;
	currentVelocity = newPosition - oldPosition;
}