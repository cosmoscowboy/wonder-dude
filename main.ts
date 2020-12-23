enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const Ground = SpriteKind.create()
    export const Mushroom = SpriteKind.create()
    export const MushroomTaken = SpriteKind.create()
    export const WeaponToTake = SpriteKind.create()
}
function animatePlayer () {
    character.loopFrames(
    dude,
    walkingImagesRight,
    Math.abs(walkingSpeed) * 4,
    character.rule(Predicate.MovingRight)
    )
    character.loopFrames(
    dude,
    walkingImagesLeft,
    Math.abs(walkingSpeed) * 4,
    character.rule(Predicate.MovingLeft)
    )
    character.loopFrames(
    dude,
    jumpingImagesRight,
    Math.abs(walkingSpeed) * 6,
    character.rule(Predicate.MovingUp, Predicate.FacingRight)
    )
    character.loopFrames(
    dude,
    jumpingImagesLeft,
    Math.abs(walkingSpeed) * 6,
    character.rule(Predicate.MovingUp, Predicate.FacingLeft)
    )
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (onGround) {
        dude.vy = jumpSpeed
        jumping = true
    }
})
sprites.onOverlap(SpriteKind.MushroomTaken, SpriteKind.Ground, function (sprite, otherSprite) {
    weapon = sprites.create(img`
        . . . . . . . . 
        . . . 5 5 . . . 
        . . 5 5 5 5 . . 
        . 5 5 5 5 5 5 . 
        . f f f f f f . 
        . . . e 7 . . . 
        . . . e 7 . . . 
        . . . e 7 . . . 
        `, SpriteKind.WeaponToTake)
    weapon.x = aMushroom.x
    weapon.bottom = aMushroom.bottom
    screenElements.push(weapon)
    aMushroom.destroy(effects.disintegrate, 500)
})
function setPlayer () {
    jumping = true
    onGround = false
    dying = false
    jumpSpeed = -125
    dude = sprites.create(img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 2 2 2 f . . . 
        . . . . . e d d e 2 2 2 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `, SpriteKind.Player)
    walkingSpeed = 75
    walkingImagesRight = [img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 2 2 2 f . . . 
        . . . . . e d d e 2 2 2 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e e e d d d f . . . 
        . . . . . f 4 d d e 4 e f . . . 
        . . . . . f e d d e 2 2 f . . . 
        . . . . f f f e e f 5 5 f f . . 
        . . . . f f f f f f f f f f . . 
        . . . . . f f . . . f f f . . . 
        `,img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 2 2 2 f . . . 
        . . . . . e d d e 2 2 2 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . 4 d d e 4 4 4 e f . . . 
        . . . . e d d e 2 2 2 2 f . . . 
        . . . . f e e f 4 4 5 5 f f . . 
        . . . . f f f f f f f f f f . . 
        . . . . . f f . . . f f f . . . 
        `]
    walkingImagesLeft = [img`
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e e f f . . . . 
        . . . f 2 2 2 e d d 4 . . . . . 
        . . . f 2 2 2 e d d e . . . . . 
        . . . f 5 5 4 f e e f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . f f f . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d e e e e e f . . . 
        . . . f e 4 e d d 4 f . . . . . 
        . . . f 2 2 e d d e f . . . . . 
        . . f f 5 5 f e e f f f . . . . 
        . . f f f f f f f f f f . . . . 
        . . . f f f . . . f f . . . . . 
        `,img`
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e e f f . . . . 
        . . . f 2 2 2 e d d 4 . . . . . 
        . . . f 2 2 2 e d d e . . . . . 
        . . . f 5 5 4 f e e f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . f f f . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e d d 4 . . . . 
        . . . f 2 2 2 2 e d d e . . . . 
        . . f f 5 5 4 4 f e e f . . . . 
        . . f f f f f f f f f f . . . . 
        . . . f f f . . . f f . . . . . 
        `]
    jumpingImagesRight = [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e e e d d d f . . . 
        . . . . . f 4 d d e 4 e f . . . 
        . . . . . f e d d e 2 2 f . . . 
        . . . . f f f e e f 5 5 f f . . 
        . . . . f f f f f f f f f f . . 
        . . . . . f f . . . f f f . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . 4 d d e 4 4 4 e f . . . 
        . . . . e d d e 2 2 2 2 f . . . 
        . . . . f e e f 4 4 5 5 f f . . 
        . . . . f f f f f f f f f f . . 
        . . . . . f f . . . f f f . . . 
        `]
    jumpingImagesLeft = [img`
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d e e e e e f . . . 
        . . . f e 4 e d d 4 f . . . . . 
        . . . f 2 2 e d d e f . . . . . 
        . . f f 5 5 f e e f f f . . . . 
        . . f f f f f f f f f f . . . . 
        . . . f f f . . . f f . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e d d 4 . . . . 
        . . . f 2 2 2 2 e d d e . . . . 
        . . f f 5 5 4 4 f e e f . . . . 
        . . f f f f f f f f f f . . . . 
        . . . f f f . . . f f . . . . . 
        `]
    controller.moveSprite(dude, walkingSpeed, 100)
    dude.x = playerStartsAt
    setPlayerOnGround(currentGroundPieces[0])
    animatePlayer()
    dude.ay = 250
    levelDisplay = textsprite.create("")
    levelDisplay.top = 5
    setLevelDisplay()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.WeaponToTake, function (sprite, otherSprite) {
    hasWeapon = true
    otherSprite.destroy()
    sprite.say("Weapon!")
    timer.after(1000, function () {
        sprite.say("")
    })
})
function placeOnGround (aSprite: Sprite, distanceFromPlayer: number) {
    aSprite.bottom = currentGroundPieces[0].top
    aSprite.x = dude.x + Math.abs(distanceFromPlayer)
    aSprite.bottom = currentGroundPieces[0].top
    screenElements.push(aSprite)
}
function setVariables () {
    scene.setBackgroundColor(8)
    screenWidth = scene.screenWidth()
    screenHeight = scene.screenHeight()
    level = 1
    distanceTravelled = 0
    distanceTravelledForLevel = 0
    groundHasGapsAfterLevel = 3
    groundHasGaps = false
    canGetWeapon = false
    hasWeapon = false
    changeLevelAfterDistanceOf = 50
    playerStartsAt = 20
    playerCannotMovePast = 60
    gapMinimum = 16
    gapMaximum = 55
    screenElements = []
}
function checkGroundOffScreen () {
    for (let value of currentGroundPieces) {
        if (value.right < 0) {
            distanceTravelled += value.width
            distanceTravelledForLevel += value.width
            dude.say(distanceTravelled)
            currentGroundPieces.removeAt(currentGroundPieces.indexOf(value))
            value.destroy()
        }
    }
    if (!(groundHasGaps)) {
        for (let index = 0; index <= currentGroundPieces.length - 1; index++) {
            aGround = currentGroundPieces[index]
            if (index + 1 < currentGroundPieces.length) {
                nextGroundPiece = currentGroundPieces[index + 1]
                nextGroundPiece.left = aGround.right
            }
        }
    }
    checkLevelFromDistance()
}
function getNextGroundPiece () {
    groundMaximumX = 0
    for (let value of currentGroundPieces) {
        if (value.right > groundMaximumX) {
            groundMaximumX = value.right
        }
    }
    if (groundMaximumX < screenWidth - gap) {
        setRandomGround()
        setNextGap()
    }
}
function moveScreenElements () {
    gameSpeed = 0
    if (dude.vx > 0) {
        gameSpeed = dude.vx * -1
    } else {
        for (let value of currentGroundPieces) {
            value.vx = 0
        }
        for (let value of screenElements) {
            value.vx = 0
        }
    }
    if (dude.x + 1 > playerCannotMovePast && dude.vx > 0) {
        for (let value of currentGroundPieces) {
            value.vx = gameSpeed
        }
        for (let value of screenElements) {
            value.vx = gameSpeed
        }
    }
}
function createBackgroundSprites () {
    ground1 = img`
        6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
        7 7 7 7 7 6 6 6 7 7 7 7 7 6 6 6 
        7 7 7 7 7 7 6 7 7 7 7 7 7 7 6 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 6 7 7 7 7 6 7 7 7 7 7 6 7 7 7 
        7 7 6 7 7 6 7 7 7 6 7 7 6 7 6 7 
        7 7 6 7 6 6 7 7 6 6 6 7 6 6 6 6 
        6 7 6 6 6 6 7 6 6 6 6 6 8 6 6 6 
        8 8 6 6 8 6 6 6 8 6 6 6 8 8 6 6 
        8 e 6 e e 8 6 6 8 8 6 8 8 8 e 8 
        8 e e e e e 6 e 8 8 e e 8 e e f 
        f e e e e f 8 e e 8 e e e e e f 
        `
    ground2 = img`
        66666666666666666666666666666666
        77777666777776667777766677777666
        77777767777777677777776777777767
        77777777777777777777777777777777
        77777777777777777777777777777777
        77777777777777777777777777777777
        77777777777777777777777777777777
        77777777777777777777777777777777
        76777767777767777677776777776777
        77677677767767677767767776776767
        77676677666766667767667766676666
        67666676666686666766667666668666
        88668666866688668866866686668866
        8e6ee866886888e88e6ee866886888e8
        8eeeee6e88ee8eef8eeeee6e88ee8eef
        feeeef8ee8eeeeeffeeeef8ee8eeeeef
        `
    ground3 = img`
        666666666666666666666666666666666666666666666666
        777776667777766677777666777776667777766677777666
        777777677777776777777767777777677777776777777767
        777777777777777777777777777777777777777777777777
        777777777777777777777777777777777777777777777777
        777777777777777777777777777777777777777777777777
        777777777777777777777777777777777777777777777777
        777777777777777777777777777777777777777777777777
        767777677777677776777767777767777677776777776777
        776776777677676777677677767767677767767776776767
        776766776667666677676677666766667767667766676666
        676666766666866667666676666686666766667666668666
        886686668666886688668666866688668866866686668866
        8e6ee866886888e88e6ee866886888e88e6ee866886888e8
        8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef
        feeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeef
        `
    ground4 = img`
        6666666666666666666666666666666666666666666666666666666666666666
        7777766677777666777776667777766677777666777776667777766677777666
        7777776777777767777777677777776777777767777777677777776777777767
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777
        7677776777776777767777677777677776777767777767777677776777776777
        7767767776776767776776777677676777677677767767677767767776776767
        7767667766676666776766776667666677676677666766667767667766676666
        6766667666668666676666766666866667666676666686666766667666668666
        8866866686668866886686668666886688668666866688668866866686668866
        8e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e8
        8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef
        feeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeef
        `
    ground5 = img`
        66666666666666666666666666666666666666666666666666666666666666666666666666666666
        77777666777776667777766677777666777776667777766677777666777776667777766677777666
        77777767777777677777776777777767777777677777776777777767777777677777776777777767
        77777777777777777777777777777777777777777777777777777777777777777777777777777777
        77777777777777777777777777777777777777777777777777777777777777777777777777777777
        77777777777777777777777777777777777777777777777777777777777777777777777777777777
        77777777777777777777777777777777777777777777777777777777777777777777777777777777
        77777777777777777777777777777777777777777777777777777777777777777777777777777777
        76777767777767777677776777776777767777677777677776777767777767777677776777776777
        77677677767767677767767776776767776776777677676777677677767767677767767776776767
        77676677666766667767667766676666776766776667666677676677666766667767667766676666
        67666676666686666766667666668666676666766666866667666676666686666766667666668666
        88668666866688668866866686668866886686668666886688668666866688668866866686668866
        8e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e8
        8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef
        feeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeef
        `
    ground6 = img`
        666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        777776667777766677777666777776667777766677777666777776667777766677777666777776667777766677777666
        777777677777776777777767777777677777776777777767777777677777776777777767777777677777776777777767
        777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        767777677777677776777767777767777677776777776777767777677777677776777767777767777677776777776777
        776776777677676777677677767767677767767776776767776776777677676777677677767767677767767776776767
        776766776667666677676677666766667767667766676666776766776667666677676677666766667767667766676666
        676666766666866667666676666686666766667666668666676666766666866667666676666686666766667666668666
        886686668666886688668666866688668866866686668866886686668666886688668666866688668866866686668866
        8e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e8
        8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef
        feeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeef
        `
    ground7 = img`
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        7777766677777666777776667777766677777666777776667777766677777666777776667777766677777666777776667777766677777666
        7777776777777767777777677777776777777767777777677777776777777767777777677777776777777767777777677777776777777767
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7677776777776777767777677777677776777767777767777677776777776777767777677777677776777767777767777677776777776777
        7767767776776767776776777677676777677677767767677767767776776767776776777677676777677677767767677767767776776767
        7767667766676666776766776667666677676677666766667767667766676666776766776667666677676677666766667767667766676666
        6766667666668666676666766666866667666676666686666766667666668666676666766666866667666676666686666766667666668666
        8866866686668866886686668666886688668666866688668866866686668866886686668666886688668666866688668866866686668866
        8e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e8
        8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef
        feeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeef
        `
    ground8 = img`
        66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        77777666777776667777766677777666777776667777766677777666777776667777766677777666777776667777766677777666777776667777766677777666
        77777767777777677777776777777767777777677777776777777767777777677777776777777767777777677777776777777767777777677777776777777767
        77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        76777767777767777677776777776777767777677777677776777767777767777677776777776777767777677777677776777767777767777677776777776777
        77677677767767677767767776776767776776777677676777677677767767677767767776776767776776777677676777677677767767677767767776776767
        77676677666766667767667766676666776766776667666677676677666766667767667766676666776766776667666677676677666766667767667766676666
        67666676666686666766667666668666676666766666866667666676666686666766667666668666676666766666866667666676666686666766667666668666
        88668666866688668866866686668866886686668666886688668666866688668866866686668866886686668666886688668666866688668866866686668866
        8e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e8
        8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef
        feeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeef
        `
    ground9 = img`
        666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        777776667777766677777666777776667777766677777666777776667777766677777666777776667777766677777666777776667777766677777666777776667777766677777666
        777777677777776777777767777777677777776777777767777777677777776777777767777777677777776777777767777777677777776777777767777777677777776777777767
        777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        767777677777677776777767777767777677776777776777767777677777677776777767777767777677776777776777767777677777677776777767777767777677776777776777
        776776777677676777677677767767677767767776776767776776777677676777677677767767677767767776776767776776777677676777677677767767677767767776776767
        776766776667666677676677666766667767667766676666776766776667666677676677666766667767667766676666776766776667666677676677666766667767667766676666
        676666766666866667666676666686666766667666668666676666766666866667666676666686666766667666668666676666766666866667666676666686666766667666668666
        886686668666886688668666866688668866866686668866886686668666886688668666866688668866866686668866886686668666886688668666866688668866866686668866
        8e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e8
        8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef
        feeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeef
        `
    ground10 = img`
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        7777766677777666777776667777766677777666777776667777766677777666777776667777766677777666777776667777766677777666777776667777766677777666777776667777766677777666
        7777776777777767777777677777776777777767777777677777776777777767777777677777776777777767777777677777776777777767777777677777776777777767777777677777776777777767
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7677776777776777767777677777677776777767777767777677776777776777767777677777677776777767777767777677776777776777767777677777677776777767777767777677776777776777
        7767767776776767776776777677676777677677767767677767767776776767776776777677676777677677767767677767767776776767776776777677676777677677767767677767767776776767
        7767667766676666776766776667666677676677666766667767667766676666776766776667666677676677666766667767667766676666776766776667666677676677666766667767667766676666
        6766667666668666676666766666866667666676666686666766667666668666676666766666866667666676666686666766667666668666676666766666866667666676666686666766667666668666
        8866866686668866886686668666886688668666866688668866866686668866886686668666886688668666866688668866866686668866886686668666886688668666866688668866866686668866
        8e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e88e6ee866886888e8
        8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef8eeeee6e88ee8eef
        feeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeeffeeeef8ee8eeeeef
        `
    aGround = sprites.create(ground10, SpriteKind.Ground)
    aGround.bottom = screenHeight
    currentGroundPieces = [aGround]
    setNextGap()
}
function playerGetsMushroom () {
    if (!(canGetWeapon)) {
        canGetWeapon = true
        aMushroom.setKind(SpriteKind.MushroomTaken)
        aMushroom.vy = -75
        aMushroom.vx = 200
        aMushroom.ay = 200
    }
}
function checkLevelFromDistance () {
    if (distanceTravelledForLevel > changeLevelAfterDistanceOf) {
        level += 1
        distanceTravelledForLevel = 0
        setLevelDisplay()
    }
}
function checkOnGround () {
    onGround = false
    for (let value of currentGroundPieces) {
        if (!(onGround)) {
            if (dude.overlapsWith(value)) {
                if (dude.bottom - 5 < value.top) {
                    setPlayerOnGround(value)
                    onGround = true
                    jumping = false
                } else {
                    dude.vx = value.vx
                }
            }
        }
    }
}
function setLevelDisplay () {
    levelDisplay.setText("Level: " + level)
    levelDisplay.x = screenWidth / 2
}
function setRandomGround () {
    groundLength = randint(2, 10)
    groundLength = 1
    if (groundLength == 2) {
        aGround = sprites.create(ground2, SpriteKind.Ground)
    } else if (groundLength == 3) {
        aGround = sprites.create(ground3, SpriteKind.Ground)
    } else if (groundLength == 4) {
        aGround = sprites.create(ground4, SpriteKind.Ground)
    } else if (groundLength == 5) {
        aGround = sprites.create(ground5, SpriteKind.Ground)
    } else if (groundLength == 6) {
        aGround = sprites.create(ground6, SpriteKind.Ground)
    } else if (groundLength == 7) {
        aGround = sprites.create(ground7, SpriteKind.Ground)
    } else if (groundLength == 8) {
        aGround = sprites.create(ground8, SpriteKind.Ground)
    } else if (groundLength == 9) {
        aGround = sprites.create(ground9, SpriteKind.Ground)
    } else if (groundLength == 10) {
        aGround = sprites.create(ground10, SpriteKind.Ground)
    } else if (groundLength == 1) {
        aGround = sprites.create(ground1, SpriteKind.Ground)
    }
    aGround.left = screenWidth
    aGround.bottom = screenHeight
    currentGroundPieces.push(aGround)
}
function checkPlayerPosition () {
    if (dude.x > playerCannotMovePast) {
        dude.x = playerCannotMovePast
    } else if (dude.x < playerStartsAt) {
        dude.x = playerStartsAt
    }
    if (dude.top > screenHeight) {
        game.over(false)
    }
}
function checkPlayerOverlaps () {
    if (dude.overlapsWith(aMushroom)) {
        playerGetsMushroom()
    }
}
function setNextGap () {
    if (groundHasGaps) {
        gap = randint(gapMinimum, gapMaximum)
    } else {
        gap = 0
    }
}
function setMushroom () {
    aMushroom = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . b b b b . . . . . . 
        . . . . b b 3 3 3 3 b b . . . . 
        . . . c b 3 3 3 3 1 1 b c . . . 
        . . c b 3 3 3 3 3 1 1 1 b c . . 
        . c b 1 1 1 3 3 3 3 1 1 3 c c . 
        c b d 1 1 1 3 3 3 3 3 3 3 b b c 
        c b b d 1 3 3 3 3 3 1 1 1 b b c 
        c b b b 3 3 1 1 3 3 1 1 d d b c 
        . c b b b d d 1 1 3 b d d d c . 
        . . c c b b d d b b b b c c . . 
        . . . . c c c c c c c c . . . . 
        . . . . . b b d 1 1 b . . . . . 
        . . . . . b d d 1 1 b . . . . . 
        `, SpriteKind.Mushroom)
    placeOnGround(aMushroom, 30)
}
function setPlayerOnGround (ground: Sprite) {
    dude.bottom = ground.top
    dude.vx = 0
    dude.vy = 0
}
function checkPlayer () {
    checkPlayerPosition()
    checkPlayerOverlaps()
}
let groundLength = 0
let ground10: Image = null
let ground9: Image = null
let ground8: Image = null
let ground7: Image = null
let ground6: Image = null
let ground5: Image = null
let ground4: Image = null
let ground3: Image = null
let ground2: Image = null
let ground1: Image = null
let gameSpeed = 0
let gap = 0
let groundMaximumX = 0
let nextGroundPiece: Sprite = null
let aGround: Sprite = null
let gapMaximum = 0
let gapMinimum = 0
let playerCannotMovePast = 0
let changeLevelAfterDistanceOf = 0
let canGetWeapon = false
let groundHasGaps = false
let groundHasGapsAfterLevel = 0
let distanceTravelledForLevel = 0
let distanceTravelled = 0
let level = 0
let screenHeight = 0
let screenWidth = 0
let hasWeapon = false
let levelDisplay: TextSprite = null
let currentGroundPieces: Sprite[] = []
let playerStartsAt = 0
let dying = false
let screenElements: Sprite[] = []
let aMushroom: Sprite = null
let weapon: Sprite = null
let jumping = false
let jumpSpeed = 0
let onGround = false
let jumpingImagesLeft: Image[] = []
let jumpingImagesRight: Image[] = []
let walkingImagesLeft: Image[] = []
let walkingSpeed = 0
let walkingImagesRight: Image[] = []
let dude: Sprite = null
setVariables()
createBackgroundSprites()
setPlayer()
setMushroom()
game.onUpdate(function () {
    moveScreenElements()
    checkGroundOffScreen()
    getNextGroundPiece()
    checkOnGround()
    checkPlayer()
})
