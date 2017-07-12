#pragma strict

var leftKey = "left";
var rightKey = "right";
var jumpKey = "space";
var ballKey;
var upKey;
var downKey;
var interactKey;

var xSpeed : float;
var jumpHeight : float;
var slopeSteepness : float;
var jitterHeight : float;

var xMovement : Vector3;
var yMovement : Vector3;

var ballForm;
var aimUp;
var aimDown;
var facingRight;
var onFloor : System.Boolean;


function Start () {
	xSpeed = 4;
	jumpHeight = 4;
	ballForm = false;
	aimUp = false;
	aimDown = false;
	facingRight = true;
	slopeSteepness = 60;
	jitterHeight = 4 * Mathf.Tan(60);
};

function Update () {
	xMovement = Vector3(Input.GetAxis("Horizontal"),0,0);
	yMovement = Vector3(0,jitterHeight,0);
	transform.position += yMovement * Time.deltaTime;
	transform.position += xMovement * xSpeed * Time.deltaTime;
	transform.position -= yMovement * Time.deltaTime;
};

function lastUpdate() {
}

function OnCollisionEnter (collision : Collision){
    if(collision == GameObject.Find("Floor").GetComponent.<BoxCollider>()){
        onFloor = true;
        xSpeed = 100;
    }
}function OnCollisionExit (collision : Collision){
    if(collision == GameObject.Find("Floor").GetComponent.<BoxCollider>()){
        onFloor = false;
        xSpeed = 4;
    }
}