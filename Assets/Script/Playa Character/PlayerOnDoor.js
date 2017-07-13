#pragma strict

var playerOnDoor : System.Boolean;

function OnTriggerEnter (collider : Collider) {
    if(collider == GameObject.Find("Character Model").GetComponent.<CapsuleCollider>()){
        playerOnDoor = true;
    }
}function OnTriggerExit (collider : Collider) {
    if(collider == GameObject.Find("Character Model").GetComponent.<CapsuleCollider>()){
        playerOnDoor = false;
    }
}