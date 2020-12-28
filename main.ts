enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const Ground = SpriteKind.create()
    export const Egg = SpriteKind.create()
    export const EggTaken = SpriteKind.create()
    export const WeaponToTake = SpriteKind.create()
    export const Weapon = SpriteKind.create()
    export const Points = SpriteKind.create()
    export const Rock = SpriteKind.create()
}
namespace NumProp {
    export const ObjectPoints = NumProp.create()
}
namespace ImageProp {
    export const ObjectImage = ImageProp.create()
}
namespace AnyProp {
    export const ObjectPositionArray = AnyProp.create()
}
function spawnRocks () {
    rockLocationsLevel = rockLocations[getLevelIndex()]
    if (rockLocationsLevel.length > 0) {
        rockLocation = rockLocationsLevel[0]
        if (rockLocation <= distanceExploredForLevel) {
            rockLocation = rockLocationsLevel.removeAt(0)
            rockSprite = sprites.create(rockImage, SpriteKind.Rock)
            placeOnGroundOutsideScreen(rockSprite)
        }
    }
}
// Top line of player jump 22 (jumps 50 pixels)
function animatePlayer () {
    character.loopFrames(
    dude,
    walkingImagesRight,
    Math.abs(walkingSpeed) * 1.5,
    character.rule(Predicate.MovingRight)
    )
    character.loopFrames(
    dude,
    walkingImagesLeft,
    Math.abs(walkingSpeed) * 1.5,
    character.rule(Predicate.MovingLeft)
    )
}
function increaseDistanceExplored (distance: number) {
    distanceExplored += distance
    distanceExploredForLevel += distance
}
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.Ground, function (sprite, otherSprite) {
    sprite.destroy()
})
function setEgg (positionX: number) {
    anEgg = sprites.create(img`
        .........5555..........
        ......5555555155.......
        ....555dd51111d551.....
        ...55ddddd1111111d55...
        ..55dddddddd111111dd5..
        ..55ddddddddddd11111d5.
        .555dddddddddddddd111d5
        f5555dddddddddddddd11d5
        f5555dddddddddddddddd55
        f55555dddddddddddddd555
        f55555555dddddddddd555f
        .f555555555dddddddd55f.
        .f555555555555555555f..
        ..f555555555555555ff...
        ...ff55555555555ff.....
        .....fff55555fff.......
        ........fffff..........
        `, SpriteKind.Egg)
    placeOnGround(anEgg, positionX)
}
function setSnails () {
    snailSpeed = -15
    snailImages = [img`
        .....................
        .....................
        .....................
        .55.55...............
        5545555..............
        1f11f11...cbbbb......
        f11f11..ccbb22221....
        .fff555ccb22222221...
        ..f5555ccb22cccc222..
        ..f5551cb22ccbbcc22..
        .f5551ccb22cb22bcc21.
        .f5551ccb22c2222bc21.
        f55551ccb22c22c22c22.
        f55551ccb22bccb22c22.
        f55551ccbb22bb222c22.
        f555551ccb2222222c22.
        f555551ccbbb2222c2225
        .f555511ccbbbbbcc2255
        .f55555111cbbcc22255f
        ..ff555555111225555f.
        ....fff5555555555ff..
        .......ffffffffff....
        `, img`
        .55.555..............
        55455555.............
        1f11f111.............
        f11f111..............
        .ff5ff5..............
        ...f5f5...cbbbb......
        ...f5f5.ccbb22221....
        ...f551ccb22222221...
        ..f5551ccb22cccc222..
        ..f5551cb22ccbbcc22..
        .f5551ccb22cb22bcc21.
        .f5551ccb22c2222bc21.
        f55551ccb22c22c22c22.
        f55551ccb22bccb22c22.
        f55551ccbb22bb222c22.
        f555551ccb2222222c22.
        f555551ccbbb2222c2225
        .f555511ccbbbbbcc2255
        .f55555111cbbcc22255f
        ..ff555555111225555f.
        ....fff5555555555ff..
        .......ffffffffff....
        `]
    snailLocations = [[256, 272], [256, 272]]
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    playerJumps()
})
function setRocks () {
    rockImage = img`
        .....fffff..........
        ....f7777ffff.......
        ...f777bbf771f......
        ...f77bbb1f7b1f.....
        ..f777bbb1f7bb1f....
        ..f7fbbbb1f77bb1f...
        .f77fbbbb1f77bb1f...
        .f77fbbbbb1f77bb1f..
        .fff7fbbbb1f77bb1f..
        .fb1f7fbbb1f77bbff..
        f7bb1f7b7ffff77f1ff.
        f77bb1f7f7711fffb1f.
        f77bb1ff7bbbb1fbbb1f
        f77bbffbbbbbb1f7bb1f
        f77bff7bb7bbb1f7bb1f
        f777f77777bbb1ff7bbf
        .f7ff77777bb7fff7bbf
        .f7ff7777777fffff7ff
        ..fffffffffffffffff.
        `
    rockLocations = [[256, 512], [256, 300]]
}
function setPlayer () {
    info.setScore(0)
    info.setLife(3)
    jumping = true
    onGround = false
    dying = false
    facingRight = true
    throwingWeapon = false
    jumpSpeed = -200
    weaponThrownEveryMs = 300
    weaponLastThrowTime = game.runtime()
    setPlayerImages()
    dude = sprites.create(idleImagesRight[0], SpriteKind.Player)
    walkingSpeed = 75
    controller.moveSprite(dude, walkingSpeed, 0)
    dude.x = playerStartsAt
    setPlayerOnGround(currentGroundPieces[0])
    animatePlayer()
    dude.ay = 400
    levelDisplay = textsprite.create("")
    levelDisplay.top = 5
    setLevelDisplay()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.WeaponToTake, function (sprite, otherSprite) {
    hasWeapon = true
    otherSprite.destroy()
    sprite.say("Weapon!")
    timer.after(500, function () {
        playerThrowsWeapon()
    })
    timer.after(1000, function () {
        sprite.say("")
    })
})
function spawnFood () {
    foodLocationsLevel = foodLocations[getLevelIndex()]
    if (foodLocationsLevel.length > 0) {
        foodLocationSet = foodLocationsLevel[0]
        foodLocation = foodLocationSet[0]
        if (foodLocation <= distanceExploredForLevel) {
            foodLocationSet = foodLocationsLevel.removeAt(0)
            foodType = foodLocationSet[1]
            foodSprite = sprites.create(foodImages[foodType], SpriteKind.Food)
            sprites.setDataNumber(foodSprite, dataPoints, foodPoints[foodType])
            foodSprite.x = screenWidth + foodLocationSet[2]
            foodSprite.bottom = foodLocationSet[3]
            addScreenElement(foodSprite)
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    playerThrowsWeapon()
})
sprites.onOverlap(SpriteKind.EggTaken, SpriteKind.Ground, function (sprite, otherSprite) {
    weapon = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . 5 5 . . . b b b . . . . . . 
        . 4 4 5 5 5 7 b b b b . . . . . 
        . f 4 7 7 5 7 b b b b 7 . . . . 
        . . 5 5 5 5 5 5 5 b 7 f . . . . 
        . b b 7 7 5 7 7 7 5 f f . . . . 
        b b b b b 5 7 b 7 5 f . . . . . 
        b b b b b 5 7 f f 5 . . . . . . 
        7 b b b b 7 5 f f 5 5 . . . . . 
        7 7 7 7 7 f 5 f 4 4 5 5 . . . . 
        f 7 7 7 7 f 5 . f 4 4 5 5 . . . 
        . f f f f f . . . f 4 4 5 5 . . 
        . . . . . . . . . . f 4 4 5 5 . 
        . . . . . . . . . . . f 4 4 5 5 
        . . . . . . . . . . . . f 4 4 5 
        . . . . . . . . . . . . . f 4 . 
        `, SpriteKind.WeaponToTake)
    weapon.x = anEgg.x
    weapon.bottom = anEgg.bottom
    addScreenElement(weapon)
    anEgg.destroy(effects.disintegrate, 500)
})
function placeOnGround (aSprite: Sprite, distanceFromPlayer: number) {
    aSprite.bottom = currentGroundPieces[0].top
    aSprite.x = dude.x + Math.abs(distanceFromPlayer)
    aSprite.bottom = currentGroundPieces[0].top
    addScreenElement(aSprite)
}
function removeScreenElement (aSprite: Sprite) {
    screenElements.removeAt(screenElements.indexOf(aSprite))
}
function setVariables () {
    scene.setBackgroundColor(8)
    screenWidth = scene.screenWidth()
    screenHeight = scene.screenHeight()
    level = 1
    area = 1
    groundHasGapsAfterLevel = 3
    showingIntroduction = false
    inLevel = true
    groundHasGaps = false
    canGetWeapon = false
    hasWeapon = false
    changeLevelAfterDistanceOf = 50
    playerStartsAt = 15
    playerCannotMovePast = 40
    gapMinimum = 16
    gapMaximum = 55
    screenElements = []
}
function setFood () {
    foodImages = [img`
        . . . . 5 5 5 4 . . . . . . . . 
        5 5 5 5 5 5 4 5 . . . . . . . . 
        5 5 5 5 4 4 4 5 1 . . . . . . . 
        4 4 4 5 5 5 5 5 5 1 1 . . . . . 
        . f 4 5 4 5 5 4 5 5 5 1 1 1 5 5 
        . f 5 5 4 5 5 5 4 4 5 5 5 5 5 . 
        . f 5 5 5 4 5 5 5 4 4 5 5 5 5 . 
        . f 5 5 5 5 4 5 5 5 5 4 5 5 f . 
        . . f 5 5 5 5 4 5 5 5 5 1 1 5 . 
        . . f 5 5 5 5 1 5 5 5 5 5 5 f . 
        . . . f 5 5 5 5 5 5 5 5 5 f . . 
        . . . . f f 5 5 5 4 f f f . . . 
        . . . . . . f f f f . . . . . . 
        `, img`
        . . . 6 . . . 7 7 
        . . . . 6 6 7 7 6 
        . . . . 6 . 6 6 . 
        . e e 5 e 4 2 2 . 
        e e 5 4 e 2 1 2 2 
        e 2 2 5 e 2 2 1 2 
        e 2 2 2 2 2 2 1 2 
        e 2 2 2 2 2 2 2 2 
        e e 2 2 2 2 2 2 e 
        f e e 2 2 2 1 2 f 
        . f e e e e 2 f . 
        . . f f f f f . . 
        `, img`
        . 7 f . . f . 7 
        . f 7 f 7 f 7 f 
        . . f 7 f 7 f . 
        . f 4 5 f 7 5 . 
        f 4 4 5 5 5 5 5 
        f 4 4 4 5 5 5 5 
        f 4 4 5 5 1 1 1 
        f 4 4 4 5 5 5 5 
        f 4 4 5 5 1 1 1 
        f 4 4 4 5 5 5 5 
        . f 4 5 5 1 1 . 
        . f 4 4 5 5 5 . 
        . . f 4 5 5 . . 
        . . . f 5 . . . 
        `]
    foodPoints = [50, 50, 100]
    foodLocations = [[[165, 0, -20, 48], [224, 1, -20, 104], [240, 2, -20, 75]], [[160, 0, -20, 48], [224, 1, -20, 104]]]
    dataPoints = "points"
}
function checkGroundOffScreen () {
    for (let value of currentGroundPieces) {
        if (value.right < 0) {
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
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    facingRight = false
})
function getLevelIndex () {
    return level - 1
}
function defineImages () {
    weaponImagesRight = [img`
        . . . . . . . . . . . . . . . . 
        . . 5 5 . . . b b b . . . . . . 
        . 4 4 5 5 5 7 b b b b . . . . . 
        . f 4 7 7 5 7 b b b b 7 . . . . 
        . . 5 5 5 5 5 5 5 b 7 f . . . . 
        . b b 7 7 5 7 7 7 5 f f . . . . 
        b b b b b 5 7 b 7 5 f . . . . . 
        b b b b b 5 7 f f 5 . . . . . . 
        7 b b b b 7 5 f f 5 5 . . . . . 
        7 7 7 7 7 f 5 f 4 4 5 5 . . . . 
        f 7 7 7 7 f 5 . f 4 4 5 5 . . . 
        . f f f f f . . . f 4 4 5 5 . . 
        . . . . . . . . . . f 4 4 5 5 . 
        . . . . . . . . . . . f 4 4 5 5 
        . . . . . . . . . . . . f 4 4 5 
        . . . . . . . . . . . . . f 4 . 
        `, img`
        . . . . . f 7 7 b b . . . . . . 
        . . . . f 7 7 b b b b . f 4 . . 
        . . . . f 7 7 b b b b 5 4 4 5 . 
        . . . . f 7 7 b b b 7 5 7 5 5 . 
        . . . . f 7 7 b b b 7 5 7 5 . . 
        . . . . f f f 7 5 5 5 5 5 5 . . 
        . . . . . 5 5 5 7 7 7 5 7 7 . . 
        . . . . . . f f f b 7 5 b b b . 
        . . . . . f 4 f f 7 7 5 b b b . 
        . . . . f 4 4 5 5 5 5 b b b b . 
        . . . f 4 4 5 5 . f f 7 b b . . 
        . . f 4 4 5 5 . . . f f 7 . . . 
        . f 4 4 5 5 . . . . . . . . . . 
        f 4 4 5 5 . . . . . . . . . . . 
        4 4 5 5 . . . . . . . . . . . . 
        . 5 5 . . . . . . . . . . . . . 
        `, img`
        . . . . . . . . . . . . . . . . 
        . 4 f . . . . . . . . . . . . . 
        5 4 4 f . . . . . . . . . . . . 
        5 5 4 4 f . . . . . . . . . . . 
        . 5 5 4 4 f . . . . . . . . . . 
        . . 5 5 4 4 f . . . f f f f f . 
        . . . 5 5 4 4 f . 5 f 7 7 7 7 f 
        . . . . 5 5 4 4 f 5 f 7 7 7 7 7 
        . . . . . 5 5 f f 5 7 b b b b 7 
        . . . . . . 5 f f 7 5 b b b b b 
        . . . . . f 5 7 b 7 5 b b b b b 
        . . . . f f 5 7 7 7 5 7 7 b b . 
        . . . . f 7 b 5 5 5 5 5 5 5 . . 
        . . . . 7 b b b b 7 5 7 7 4 f . 
        . . . . . b b b b 7 5 5 5 4 4 . 
        . . . . . . b b b . . . 5 5 . . 
        `, img`
        . . . . . . . . . . . . 5 5 . . 
        . . . . . . . . . . . 5 5 4 4 . 
        . . . . . . . . . . 5 5 4 4 f . 
        . . . . . . . . . 5 5 4 4 f . . 
        . . 7 f f . . . 5 5 4 4 f . . . 
        . b b 7 f f . 5 5 4 4 f . . . . 
        b b b b 5 5 5 5 4 4 f . . . . . 
        b b b 5 7 7 f f 4 f . . . . . . 
        b b b 5 7 b f f f . . . . . . . 
        . 7 7 5 7 7 7 5 5 5 . . . . . . 
        . 5 5 5 5 5 5 7 f f f . . . . . 
        . 5 7 5 7 b b b 7 7 f . . . . . 
        5 5 7 5 7 b b b 7 7 f . . . . . 
        5 4 4 5 b b b b 7 7 f . . . . . 
        . 4 f . b b b b 7 7 f . . . . . 
        . . . . . b b 7 7 f . . . . . . 
        `]
    weaponImagesLeft = []
    for (let value2 of weaponImagesRight) {
        anImage = value2.clone()
        anImage.flipX()
        weaponImagesLeft.push(anImage)
    }
    pointsImages = [img`
        . f f f f f f . . . . . . 
        f 5 5 5 5 5 f . . . . . . 
        f 5 5 f f f f . f f f . . 
        f 5 5 f f f . f 5 5 5 f . 
        f 5 5 5 5 5 f f f f 5 5 f 
        f f f f f 5 5 f f f 5 5 f 
        f f f f f 5 5 f f f 5 5 f 
        f 5 5 f f 5 5 f f f 5 5 f 
        f f 5 5 5 5 f f 5 5 5 f . 
        . f f f f f . . f f f . . 
        `, img`
        . . f f f . . . . . . . . . . 
        . f 5 5 f . . . . . . . . . . 
        f 5 5 5 f . f f f . f f f . . 
        f f 5 5 f f 5 5 5 f 5 5 5 f . 
        . f 5 5 f 5 f f 5 5 f f 5 5 f 
        . f 5 5 f 5 f f 5 5 f f 5 5 f 
        . f 5 5 f 5 f f 5 5 f f 5 5 f 
        . f 5 5 f 5 f f 5 5 f f 5 5 f 
        . f 5 5 f f 5 5 5 f 5 5 5 f . 
        . f f f f . f f f . f f f . . 
        `, img`
        . . f f f f . . . . . . . . . . . 
        . f 5 5 5 5 f f . . . . . . . . . 
        f 5 5 f f 5 5 f f f f . f f f . . 
        f f f f 5 5 5 f 5 5 5 f 5 5 5 f . 
        . f f 5 5 5 f 5 f f 5 5 f f 5 5 f 
        f f 5 5 f f f 5 f f 5 5 f f 5 5 f 
        f 5 5 f f f f 5 f f 5 5 f f 5 5 f 
        f 5 5 f f f f 5 f f 5 5 f f 5 5 f 
        f 5 5 5 5 5 5 f 5 5 5 f 5 5 5 f . 
        . f f f f f f . f f f . f f f . . 
        `, img`
        . f f f f f f . . . . . . . . . . 
        f 5 5 5 5 5 f . . . . . . . . . . 
        f 5 5 f f f f . f f f . f f f . . 
        f 5 5 f f f . f 5 5 5 f 5 5 5 f . 
        f 5 5 5 5 5 f f f f 5 5 f f 5 5 f 
        f f f f f 5 5 f f f 5 5 f f 5 5 f 
        f f f f f 5 5 f f f 5 5 f f 5 5 f 
        f 5 5 f f 5 5 f f f 5 5 f f 5 5 f 
        f f 5 5 5 5 f f 5 5 5 f 5 5 5 f . 
        . f f f f f . . f f f . f f f . . 
        `]
}
function getNextGroundPiece () {
    groundMaximumX = 0
    for (let value22 of currentGroundPieces) {
        if (value22.right > groundMaximumX) {
            groundMaximumX = value22.right
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
        for (let value3 of currentGroundPieces) {
            value3.vx = 0
        }
        for (let value4 of screenElements) {
            value4.vx = 0
        }
    }
    if (dude.x + 1 > playerCannotMovePast && dude.vx > 0) {
        for (let value5 of currentGroundPieces) {
            value5.vx = gameSpeed
        }
        for (let value6 of screenElements) {
            value6.vx = gameSpeed
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
    increaseDistanceExplored(aGround.width)
    setNextGap()
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    facingRight = true
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Rock, function (sprite, otherSprite) {
	
})
function setPlayerImages () {
    idleImagesRight = [img`
        ....45...55555.........
        ..5554e555551155.......
        ....4e55455555115......
        ...55554544555515......
        .....f444455555555.....
        .....f444455155515.....
        ....f44445551e55e55....
        ....f44455e55e5ee55....
        ....f44555e5eeddde5....
        ....f44555eed11d1d5....
        ....f44de5ee11fdf15....
        ....f44de5ed11fdf15....
        .....f445eeedddddd5....
        .....f4455eeddd1dd.....
        .....f4455eeddd2dd.....
        ......f4455eedddd5.....
        .......fddddeeee5......
        ......fdddeeddddd......
        .....fdddeddedddded....
        .....fdddddddeddded....
        .....fdddddddeddeed....
        ......fdddddeddedd.....
        .......f6777eeeedd6....
        ......f6667766eedd6....
        .....f666ed776eeddf....
        ......f6eddd77eeddd....
        .......fedddf7feddd....
        .......feddd.f.fff.....
        .......feddd...........
        .......feeddd..........
        ........feedd..........
        .........fff...........
        `, img`
        ....45...55555.........
        ..5554e555551155.......
        ....4e55455555115......
        ...55554544555515......
        .....f444455555555.....
        .....f444455155515.....
        ....f44445551e55e55....
        ....f44455e55e5ee55....
        ....f44555e5eeddde5....
        ....f44555eed11d1d5....
        ....f44de5ee11fdf15....
        ....f44de5ed11fdf15....
        .....f445eeedddddd5....
        .....f4455eeddd1dd.....
        .....f4455eeddd2dd.....
        ......f4455eedddd5.....
        .......fddddeeee5......
        ......fdddeeddddd......
        .....fdddeddedddded....
        .....fddddddeeddded....
        .....fdddddeddedded....
        ......fdddedddede......
        .......f6eeddd666......
        ......f66eeddd666......
        ......f66eedddd666.....
        .....f66ffeedddef6.....
        ......ff..ffeeed.......
        ...........feedd.......
        ...........feedd.......
        ...........feeddd......
        ............feedd......
        .............fff.......
        `]
    idleImagesLeft = []
    for (let value7 of idleImagesRight) {
        anImage = value7.clone()
        anImage.flipX()
        idleImagesLeft.push(anImage)
    }
    walkingImagesRight = [img`
        .....5...55555.........
        ...554e555551155.......
        ....4e45455555115......
        ...55454544555515......
        .....f444455555555.....
        .....f444455155515.....
        ....f44445551e55e55....
        ....f44455e55e5ee55....
        ....f44555e5eeddde5....
        ....f44555eed11d1d5....
        ....f44de5ee11fdf15....
        ....f44de5ed11fdf15....
        .....f445eeedddddd5....
        .....f4455eeddd1dd.....
        .....f4455eeddd2dd.....
        ......f4455eedddd5.....
        .......fddddeeee5......
        ......fddddddddd.......
        .....fddddedddddd......
        .....fddddeeddddd......
        .....fddddddedddded....
        ......fddddddeddded....
        .....ffffddddeddded....
        ....f66667ddeeee77.....
        .....f666667777777.....
        ......f6e666677dd7.....
        ......feed6666eddd.....
        ......feedddf6eddd.....
        .......feddf.feddd.....
        ........fff..feeddd....
        ..............feeed....
        ...............fff.....
        `, img`
        .....5...55555.........
        ...554e555551155.......
        ....4e45455555115......
        ...55454544555515......
        .....f444455555555.....
        .....f444455155515.....
        ....f44445551e55e55....
        ....f44455e55e5ee55....
        ....f44555e5eeddde5....
        ....f44555eed11d1d5....
        ....f44de5ee11fdf15....
        ....f44de5ed11fdf15....
        .....f445eeedddddd5....
        .....f4455eeddd1dd.....
        .....f4455eeddd2dd.....
        ......f4455eedddd5.....
        .......fddddeeee5......
        ......fdddddddddd......
        .....fddddeddddddd.....
        .....fddddeeddddded....
        .....fddddddedddded....
        ......fddddddeeeded....
        .......ffddee6777......
        .......f666dd67767.....
        ......f66edddd6767.....
        .....f666eedddfe77.....
        ......fffeedddeed......
        .........feddded.......
        .........feedd.........
        .........feeddd........
        ..........feedd........
        ...........fff.........
        `, img`
        .......................
        .....5...55555.........
        ...554e555551155.......
        ....4e45455555115......
        ...55454544555515......
        .....f444455555555.....
        .....f444455155515.....
        ....f44445551e55e55....
        ....f44455e55e5ee55....
        ....f44555e5eeddde5....
        ....f44555eed11d1d5....
        ....f44de5ee11fdf15....
        ....f44de5ed11fdf15....
        .....f445eeedddddd5....
        .....f4455eeddd1dd.....
        .....f4455eeddd2dd.....
        ......f4455eedddd5.....
        .......ffdddeeee5......
        .......fdddddddd.......
        ......fddddeddddd......
        ......fddddeedddd......
        ......fddddddeddd......
        ....ff66ddddddedd......
        ...f666666dddde77dd....
        ....f666666dd77ddddd.dd
        ...f6f666777777eddddddd
        ....fe66666677eeeeedddd
        ...fee66ddf7ffffffeeddd
        ...feeddd..f......feeef
        ...feddd...........fff.
        ....fddd...............
        .....ff................
        `, img`
        .....5...55555.........
        ...554e555551155.......
        ....4e45455555115......
        ...55454544555515......
        .....f444455555555.....
        .....f444455155515.....
        ....f44445551e55e55....
        ....f44455e55e5ee55....
        ....f44555e5eeddde5....
        ....f44555eed11d1d5....
        ....f44de5ee11fdf15....
        ....f44de5ed11fdf15....
        .....f445eeedddddd5....
        .....f4455eeddd1dd.....
        .....f4455eeddd2dd.....
        ......f4455eedddd5.....
        .......fddddeeee5......
        ......fdddddddddd......
        .....fddddeddddddd.....
        .....fddddeeddddded....
        .....fddddddedddded....
        ......fddddddeeeded....
        .......ffddee6777......
        .......f666dd67767.....
        ......f66edddd6767.....
        .....f666eedddfe77.....
        ......fffeedddeed......
        .........feddded.......
        .........feedd.........
        .........feeddd........
        ..........feedd........
        ...........fff.........
        `, img`
        .......................
        .......................
        .....5...55555.........
        ...554e555551155.......
        ....4e45455555115......
        ...55454544555515......
        .....f444455555555.....
        .....f444455155515.....
        ....f44445551e55e55....
        ....f44455e55e5ee55....
        ....f44555e5eeddde5....
        ....f44555eed11d1d5....
        ....f44de5ee11fdf15....
        ....f44de5ed11fdf15....
        .....f445eeedddddd5....
        .....f4455eeddd1dd.....
        .....f4455eeddd2dd.....
        ......f4455eedddd5.....
        .......fddddeeee5......
        ......fddddddddd.......
        .....fddddedddddd......
        .....fddddeeddddded....
        .....fddddddedddded....
        ......fddddddeeeded....
        .......ffddedddd6e.....
        .....fff666dddddd6.....
        ....feeee666eedddd.dd..
        ....feeeee66f6eedddddd.
        ....feddeef6fffeeddddd.
        ....feddff.f...feeedd..
        ....fedf........feeef..
        .....ff..........fff...
        `]
    walkingImagesLeft = []
    for (let value72 of walkingImagesRight) {
        anImage = value72.clone()
        anImage.flipX()
        walkingImagesLeft.push(anImage)
    }
    throwingImagesRight = [img`
        .......................
        .......................
        ....5.5.4555...........
        ....4555555555.........
        ...545555555555........
        ....545544555555.......
        ....f45445545555.......
        ...f44545554e5555......
        ...f4545555ee5e55......
        ...f454545eeeede5......
        ...f4445eee11d1d5......
        ...f44e5ee11fdf1.......
        ..fe44d5ee11fdf1.......
        ..fe445deedddddd.......
        ..fedd4d5eedd1dd.......
        ..fedddd5eedd2dd.......
        ...fedddddeeddd........
        ...fedddddddeeed.......
        ....feddeddddddedd.....
        .....feeeeddddddeddd...
        ......ffeeedddddedd....
        ........feeeedd77f.....
        .......f666777777ddd...
        ......f6666677777eddd..
        ......f666dd6777eeddd..
        ......f6feddd677feeddd.
        .......ffedddf67.feedd.
        .......fedddd.f...fff..
        ......feeddd...........
        ......feedddd..........
        .......feeedd..........
        ........ffff...........
        `, img`
        .......................
        .......................
        .......................
        ........5..............
        .....55.5..555.........
        ......55454455555......
        .....5544544445555.....
        ......f454444455555....
        .....f4444444445555....
        .....f44444444455555...
        .....f44444444454555...
        .....f4444444445455e.d.
        .....f44444444444eeddd.
        .....f4444444444eddddd.
        ......f444444eddddddddd
        ......f4444edddddddddf.
        ......fe44eedddddddff..
        .......eeeeeeddddff....
        ......deeeeeeeddf......
        .....de66eeeeedd.......
        .....e666677eedd.......
        ....f666776667777......
        ..ffee666677777777.....
        .feeee6d6666677e77.....
        feeeedddd66677edd7.....
        feedddddfff67eedd.7....
        feeddfff...feeedd......
        .fddf.......feeedd.....
        ..ff........feeedd.....
        .............feeed.....
        ..............feee.....
        ...............fff.....
        `]
    throwingImagesLeft = []
    for (let value73 of throwingImagesRight) {
        anImage = value73.clone()
        anImage.flipX()
        throwingImagesLeft.push(anImage)
    }
    jumpingImageRight = img`
        .......................
        ....5...55555..........
        ..554e555551155........
        ...4e45455555115.......
        ..55454544555515.......
        ....f444455555555......
        ....f441455155515......
        ...f44445551e55e55.....
        ...f44455e55e5ee55.....
        ...f44555e5eeddde5.....
        ...f44555eed11d1d5.....
        ...f44de5ee11fdf15.....
        ...f44de5ed11fdf15.....
        ....f445eeedddddd5.....
        ....f4455eeddd1dd......
        ....f4455eeddd2dd......
        .....f4455eedddd5......
        ......ffdddeeee5.......
        ......fdddddddd........
        .....fddddeddddd.......
        .....fddddeedddd.......
        .....fddddddeddd.......
        ...ff66ddddddedd.......
        ..f666666dddde77dd.....
        ...f666666dd77ddddd.dd.
        ..f6f666777777edddddddd
        ...fe66666677eeeeeddddd
        ..fee66ddf7ffffffeedddf
        ..feeddd..f......feeef.
        ..feddd...........fff..
        ...fddd................
        ....ff.................
        `
    jumpingImageLeft = img`
        .......................
        ....5...55555..........
        ..554e555551155........
        ...4e45455555115.......
        ..55454544555515.......
        ....f444455555555......
        ....f441455155515......
        ...f44445551e55e55.....
        ...f44455e55e5ee55.....
        ...f44555e5eeddde5.....
        ...f44555eed11d1d5.....
        ...f44de5ee11fdf15.....
        ...f44de5ed11fdf15.....
        ....f445eeedddddd5.....
        ....f4455eeddd1dd......
        ....f4455eeddd2dd......
        .....f4455eedddd5......
        ......ffdddeeee5.......
        ......fdddddddd........
        .....fddddeddddd.......
        .....fddddeedddd.......
        .....fddddddeddd.......
        ...ff66ddddddedd.......
        ..f666666dddde77dd.....
        ...f666666dd77ddddd.dd.
        ..f6f666777777edddddddd
        ...fe66666677eeeeeddddd
        ..fee66ddf7ffffffeedddf
        ..feeddd..f......feeef.
        ..feddd...........fff..
        ...fddd................
        ....ff.................
        `
    jumpingImageLeft.flipX()
}
function checkLevelFromDistance () {
    if (distanceExploredForLevel > changeLevelAfterDistanceOf) {
        level += 1
        distanceExploredForLevel = 0
        setLevelDisplay()
    }
}
function checkOnGround () {
    onGround = false
    for (let value8 of currentGroundPieces) {
        if (!(onGround)) {
            if (dude.overlapsWith(value8)) {
                if (dude.bottom - 5 < value8.top) {
                    setPlayerOnGround(value8)
                } else {
                    dude.vx = value8.vx
                }
            }
        }
    }
}
function setLevelDisplay () {
    levelDisplay.setText("" + level + "-" + area)
    levelDisplay.setMaxFontHeight(2)
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
    increaseDistanceExplored(aGround.width)
}
function checkPlayerPosition () {
    dude.say("" + dude.ax + "-" + dude.vx)
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
    if (dude.overlapsWith(anEgg)) {
        playerGetsEgg()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    showPoints(otherSprite)
    otherSprite.destroy()
})
function setNextGap () {
    if (groundHasGaps) {
        gap = randint(gapMinimum, gapMaximum)
    } else {
        gap = 0
    }
}
function placeOnGroundOutsideScreen (aSprite: Sprite) {
    aSprite.bottom = currentGroundPieces[0].top
    aSprite.left = screenWidth
    addScreenElement(aSprite)
}
function playerGetsEgg () {
    if (!(canGetWeapon)) {
        removeScreenElement(anEgg)
        anEgg.setKind(SpriteKind.EggTaken)
        anEgg.setImage(img`
            .........5555..........
            ......55555ee555.......
            ....5555dd1eefd555.....
            ...555dddd11e1111d55...
            ..555dddddd1e11111d55..
            ..555dddddde1ee11111d5.
            .5555dddddded11edd111d5
            f5555dddddeeddddddd11d5
            f5555ddddeddddddddddd55
            f55555dddedddddddddd555
            f55555555fedddddddd555f
            .f55555555fdddddddd55f.
            .f555555555f55555555f..
            ..f55555555f555555ff...
            ...ff55555f55555ff.....
            .....fff55555fff.......
            ........fffff..........
            `)
        anEgg.vy = -75
        anEgg.vx = 50
        anEgg.ay = 200
        canGetWeapon = true
    }
}
function playerThrowsWeapon () {
    if (hasWeapon) {
        if (weaponLastThrowTime < game.runtime()) {
            throwingWeapon = true
            character.setCharacterAnimationsEnabled(dude, false)
            weaponLastThrowTime = game.runtime() + weaponThrownEveryMs
            weaponSprite = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Weapon)
            weaponSprite.y = dude.y - 10
            if (facingRight) {
                animation.runImageAnimation(
                dude,
                throwingImagesRight,
                200,
                false
                )
                weaponSprite.x = dude.x - 7
                animation.runImageAnimation(
                weaponSprite,
                weaponImagesRight,
                150,
                true
                )
                timer.after(100, function () {
                    weaponSprite.ay = 200
                    weaponSprite.vx = 125
                })
            } else {
                animation.runImageAnimation(
                dude,
                throwingImagesLeft,
                200,
                false
                )
                weaponSprite.x = dude.x + 7
                animation.runImageAnimation(
                weaponSprite,
                weaponImagesLeft,
                150,
                true
                )
                timer.after(100, function () {
                    weaponSprite.ay = 200
                    weaponSprite.vx = -125
                })
            }
            timer.after(350, function () {
                throwingWeapon = false
                character.setCharacterAnimationsEnabled(dude, true)
                setIdleImage()
            })
        }
    }
}
function setPlayerOnGround (ground: Sprite) {
    if (!(throwingWeapon)) {
        if (jumping) {
            setIdleImage()
        }
        character.setCharacterAnimationsEnabled(dude, true)
    }
    onGround = true
    jumping = false
    dude.bottom = ground.top
    dude.vx = 0
    dude.vy = 0
}
function showPoints (aSprite: Sprite) {
    if (sprites.readDataNumber(aSprite, dataPoints) == 500) {
        anImage = pointsImages[3]
        pointsTaken = 500
    } else if (sprites.readDataNumber(aSprite, dataPoints) == 200) {
        anImage = pointsImages[2]
        pointsTaken = 200
    } else if (sprites.readDataNumber(aSprite, dataPoints) == 100) {
        anImage = pointsImages[1]
        pointsTaken = 100
    } else {
        anImage = pointsImages[0]
        pointsTaken = 50
    }
    pointsSprite = sprites.create(anImage, SpriteKind.Points)
    pointsSprite.setPosition(aSprite.x, aSprite.y)
    pointsSprite.setFlag(SpriteFlag.Invisible, false)
    addScreenElement(pointsSprite)
    timer.after(250, function () {
        pointsSprite.setFlag(SpriteFlag.Invisible, true)
        info.changeScoreBy(pointsTaken)
        timer.after(1000, function () {
            removeScreenElement(pointsSprite)
            pointsSprite.destroy()
        })
    })
}
function setIdleImage () {
    if (facingRight) {
        dude.setImage(idleImagesRight[0])
    } else {
        dude.setImage(idleImagesLeft[0])
    }
}
function addScreenElement (aSprite: Sprite) {
    screenElements.push(aSprite)
}
function playerJumps () {
    if (onGround) {
        character.setCharacterAnimationsEnabled(dude, false)
        dude.vy = jumpSpeed
        jumping = true
        if (facingRight) {
            dude.setImage(jumpingImageRight)
        } else {
            dude.setImage(jumpingImageLeft)
        }
    }
}
function checkPlayer () {
    checkPlayerPosition()
    checkPlayerOverlaps()
}
let pointsSprite: Sprite = null
let pointsTaken = 0
let weaponSprite: Sprite = null
let groundLength = 0
let jumpingImageLeft: Image = null
let jumpingImageRight: Image = null
let throwingImagesLeft: Image[] = []
let throwingImagesRight: Image[] = []
let idleImagesLeft: Image[] = []
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
let pointsImages: Image[] = []
let anImage: Image = null
let weaponImagesLeft: Image[] = []
let weaponImagesRight: Image[] = []
let nextGroundPiece: Sprite = null
let aGround: Sprite = null
let gapMaximum = 0
let gapMinimum = 0
let playerCannotMovePast = 0
let changeLevelAfterDistanceOf = 0
let canGetWeapon = false
let groundHasGaps = false
let inLevel = false
let showingIntroduction = false
let groundHasGapsAfterLevel = 0
let area = 0
let level = 0
let screenHeight = 0
let screenElements: Sprite[] = []
let weapon: Sprite = null
let screenWidth = 0
let foodPoints: number[] = []
let dataPoints = ""
let foodImages: Image[] = []
let foodSprite: Sprite = null
let foodType = 0
let foodLocation = 0
let foodLocationSet: number[] = []
let foodLocations: number[][][] = []
let foodLocationsLevel: number[][] = []
let hasWeapon = false
let levelDisplay: TextSprite = null
let currentGroundPieces: Sprite[] = []
let playerStartsAt = 0
let idleImagesRight: Image[] = []
let weaponLastThrowTime = 0
let weaponThrownEveryMs = 0
let jumpSpeed = 0
let throwingWeapon = false
let facingRight = false
let dying = false
let onGround = false
let jumping = false
let snailLocations: number[][] = []
let snailImages: Image[] = []
let snailSpeed = 0
let anEgg: Sprite = null
let distanceExplored = 0
let walkingImagesLeft: Image[] = []
let walkingSpeed = 0
let walkingImagesRight: Image[] = []
let dude: Sprite = null
let rockImage: Image = null
let rockSprite: Sprite = null
let distanceExploredForLevel = 0
let rockLocation = 0
let rockLocations: number[][] = []
let rockLocationsLevel: number[] = []
setVariables()
setFood()
setRocks()
setSnails()
createBackgroundSprites()
setPlayer()
setEgg(scene.screenWidth() * 2)
defineImages()
game.onUpdate(function () {
    if (showingIntroduction) {
    	
    } else if (inLevel) {
        moveScreenElements()
        checkGroundOffScreen()
        getNextGroundPiece()
        checkOnGround()
        checkPlayer()
        spawnFood()
        spawnRocks()
    }
})
