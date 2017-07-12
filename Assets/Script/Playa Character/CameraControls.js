#pragma strict

var cameraXPosition : float;
var cameraYPosition : float;


function Start () {
	
};

function Update () {
	cameraXPosition = GameObject.Find("Character Model").transform.position.x;
	cameraYPosition = GameObject.Find("Character Model").transform.position.y;
	transform.position = Vector3(cameraXPosition,cameraYPosition + 3.5,-10);
	transform.rotation = Quaternion.Euler(Vector3(0,0,0));
};
