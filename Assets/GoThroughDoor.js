#pragma strict
import UnityEngine.SceneManagement;

var playerOnDoor : PlayerOnDoor;
var interactKey : String = "e";

function Start () {
    playerOnDoor = GetComponent.<PlayerOnDoor>();
}

function Update () {
    if(Input.GetKeyDown(interactKey) && playerOnDoor.playerOnDoor){
        SceneManager.LoadScene("Level02");
    }
}
