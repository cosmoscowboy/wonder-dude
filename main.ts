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
    export const Snail = SpriteKind.create()
    export const EnemyDying = SpriteKind.create()
    export const Snake = SpriteKind.create()
    export const Tree = SpriteKind.create()
    export const PlayerDead = SpriteKind.create()
    export const Spider = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Snake, function (sprite, otherSprite) {
    playerDies()
})
function placeTrees (total: number, startPosition: number) {
    for (let index4 = 0; index4 <= total - 1; index4++) {
        treeSprite = sprites.create(treeImage, SpriteKind.Tree)
        treeSprite.top = 0
        treeSprite.left = startPosition + treeSprite.width * index4
        treeSprite.z = -10
        addScreenElement(treeSprite)
    }
}
function spawnRocks () {
    rockLocationsLevel = rockLocations[getLevelIndex()]
    if (rockLocationsLevel.length > 0) {
        aLocation = rockLocationsLevel[0]
        if (aLocation <= distanceExploredForLevel) {
            aLocation = rockLocationsLevel.removeAt(0)
            rockSprite = sprites.create(rockImage, SpriteKind.Rock)
            rockSprite.z = -1
            placeOnGroundOutsideScreen(rockSprite)
        }
    }
}
function checkEnemyPosition () {
    for (let value of sprites.allOfKind(SpriteKind.Spider)) {
        if (value.bottom >= maximumHeightForItems) {
            value.bottom = maximumHeightForItems - 2
            value.vy = value.vy * -1
        } else if (value.bottom <= minimumHeightForItems) {
            value.bottom = minimumHeightForItems + 2
            value.vy = value.vy * -1
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
function restartInLevel () {
    if (info.life() > 1) {
        dude.setFlag(SpriteFlag.Invisible, true)
        timer.background(function () {
            color.startFade(color.originalPalette, color.Black, 1000)
            color.pauseUntilFadeDone()
            for (let value of spritesToDestroyAfterDying) {
                screenElements.removeAt(screenElements.indexOf(value))
                value.destroy()
            }
            timer.after(500, function () {
                color.startFade(color.Black, color.originalPalette, 1000)
                color.pauseUntilFadeDone()
                dude.setFlag(SpriteFlag.Invisible, false)
                dude.setKind(SpriteKind.Player)
                setPlayerOnGround(groundPieces[0])
                dying = false
                setIdleImage()
                havePlayerMove()
                playerEnergy.value = 100
                facingRight = true
            })
        })
    } else {
    	
    }
    info.changeLifeBy(-1)
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Spider, function (sprite, otherSprite) {
    playerDies()
})
function setSnails () {
    snailSpeed = -5
    snailImageDying = img`
        . . . . . . . c b b b b . . . . . 
        . . . . . c c b b 2 2 2 2 1 . . . 
        . . . . c c b 2 2 2 2 2 2 2 1 . . 
        . . . c c c b 2 2 c c c c 2 2 2 . 
        . . . c c b 2 2 c c b b c c 2 2 . 
        . . c c c b 2 2 c b 2 2 b c c 2 1 
        . . c c c b 2 2 c 2 2 2 2 b c 2 1 
        . . c c c b 2 2 c 2 2 c 2 2 c 2 2 
        . . c c c b 2 2 b c c b 2 2 c 2 2 
        . . c c c b b 2 2 b b 2 2 2 c 2 2 
        . 2 2 2 2 c b 2 2 2 2 2 2 2 c 2 2 
        2 4 4 4 4 2 b b b 2 2 2 2 c 2 2 2 
        4 4 f f f 2 2 b b b b b c c 2 2 . 
        4 f f f f f 2 2 b b c c 2 2 2 . . 
        . . f f f f f 2 2 2 2 2 . . . . . 
        `
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
    snailLocations = [[606, 638], [256, 272]]
    snailLocationsLevelTemp = []
    if (testing) {
        for (let index = 0; index <= getLevelIndex() - 1; index++) {
            snailLocations.shift()
        }
        if (snailLocations.length > 0) {
            snailLocationsLevel = snailLocations[getLevelIndex()]
            for (let value of snailLocationsLevel) {
                if (value >= distanceExploredForLevel) {
                    snailLocationsLevelTemp.push(value)
                }
            }
            snailLocations[getLevelIndex()] = snailLocationsLevelTemp
        }
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    playerJumps()
})
function havePlayerMove () {
    controller.moveSprite(dude, walkingSpeed, 0)
    dude.x = playerStartsAt
    setPlayerOnGround(groundPieces[0])
    animatePlayer()
    dude.ay = 450
}
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
    rockLocations = [[256, 512, 1072], [256, 300]]
    rockLocationsLevelTemp = []
    if (testing) {
        for (let index2 = 0; index2 <= getLevelIndex() - 1; index2++) {
            rockLocations.shift()
        }
        if (rockLocations.length > 0) {
            rockLocationsLevel = rockLocations[getLevelIndex()]
            for (let value2 of rockLocationsLevel) {
                if (value2 >= distanceExploredForLevel) {
                    rockLocationsLevelTemp.push(value2)
                }
            }
            rockLocations[getLevelIndex()] = rockLocationsLevelTemp
        }
    }
}
function playerHitByEnemyLosesEnergy (enemySprite: Sprite, enemyImageDying: Image) {
    if (!(takingDamage)) {
        reduceEnergy2 = sprites.readDataNumber(enemySprite, dataDamage)
        if (reduceEnergy2) {
            reduceEnergy(reduceEnergy2)
        }
        playerTakesDamage(false, enemySprite)
    }
    enemyDies(enemySprite, enemyImageDying)
}
function setPlayer () {
    info.setScore(0)
    info.setLife(3)
    jumping = true
    onGround = false
    dying = false
    facingRight = true
    throwingWeapon = false
    takingDamage = false
    jumpSpeed = -200
    weaponThrownEveryMs = 200
    weaponLastThrowTime = game.runtime()
    eneryLostEveryMs = 250
    energyLostEachTime = 1
    energyLastLostTime = game.runtime() + eneryLostEveryMs
    setPlayerImages()
    dude = sprites.create(idleImagesRight[0], SpriteKind.Player)
    walkingSpeed = 75
    havePlayerMove()
    playerEnergy = statusbars.create(60, 8, StatusBarKind.Energy)
    playerEnergy.x = screenWidth / 2
    playerEnergy.top = 0
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.WeaponToTake, function (sprite, otherSprite) {
    hasWeapon = true
    otherSprite.destroy()
    sprite.say("Weapon!")
    timer.after(250, function () {
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
            sprites.setDataNumber(foodSprite, dataEnergy, foodEnergies[foodType])
            foodSprite.x = screenWidth + foodLocationSet[2]
            foodSprite.bottom = foodLocationSet[3]
            addScreenElement(foodSprite)
            addSpriteToBeRemovedWhenDying(foodSprite)
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
    aSprite.bottom = groundPieces[0].top
    aSprite.x = dude.x + Math.abs(distanceFromPlayer)
    aSprite.bottom = groundPieces[0].top
    addScreenElement(aSprite)
}
function removeScreenElement (aSprite: Sprite, destroy: boolean) {
    screenElements.removeAt(screenElements.indexOf(aSprite))
    if (destroy) {
        aSprite.destroy()
    }
}
function addSpriteToBeRemovedWhenDying (aSprite: Sprite) {
    spritesToDestroyAfterDying.push(aSprite)
}
// levelDisplay = textsprite.create("")
// levelDisplay.top = 0
// levelDisplay.left = 30
// setLevelDisplay()
function setVariables () {
    scene.setBackgroundColor(8)
    screenWidth = scene.screenWidth()
    screenHeight = scene.screenHeight()
    level = 1
    area = 1
    groundHasGapsAfterLevel = 3
    testing = false
    showingIntroduction = false
    inLevel = []
    groundHasGaps = false
    canGetWeapon = false
    hasWeapon = false
    distanceExploredForLevel = 0
    changeLevelAfterDistanceOf = 50
    playerStartsAt = 15
    playerCannotMovePast = 40
    minimumHeightForItems = 48
    maximumHeightForItems = 104
    playerTop = 72
    gapMinimum = 16
    gapMaximum = 55
    dataPoints = "points"
    dataEnergy = "energy"
    dataSpeedX = "speedX"
    dataSpeedY = "speedY"
    dataDamage = "damage"
    dataCanMoveUpAndDown = "canMoveUpAndDown"
    screenElements = []
    spritesToDestroyAfterDying = []
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
    foodEnergies = [5, 5, 10]
    foodLocations = [[
    [160, 0, -20, maximumHeightForItems],
    [224, 1, -20, 104],
    [240, 2, -20, 55],
    [800, 1, -20, 66],
    [832, 0, -20, maximumHeightForItems],
    [1056, 2, -40, 80],
    [1088, 1, -40, minimumHeightForItems]
    ], [[160, 0, -20, maximumHeightForItems], [224, 1, -20, 104]]]
    foodLocationsLevel = [[165], [224], [240]]
    foodLocationsLevel = []
    foodLocationsLevelTemp = [[165], [224], [240]]
    foodLocationsLevelTemp = []
    foodLocationSet = [165]
    foodLocationSet = []
    if (testing) {
        for (let index3 = 0; index3 <= getLevelIndex() - 1; index3++) {
            foodLocations.shift()
        }
        if (foodLocations.length > 0) {
            foodLocationsLevel = foodLocations[getLevelIndex()]
            for (let value3 of foodLocationsLevel) {
                foodLocationSet = foodLocationsLevel[0]
                foodLocation = foodLocationSet[0]
                if (foodLocation >= distanceExploredForLevel) {
                    foodLocationsLevelTemp.push(value3)
                }
            }
            foodLocations[getLevelIndex()] = foodLocationsLevelTemp
        }
    }
}
function checkGroundOffScreen () {
    for (let value22 of groundPieces) {
        if (value22.right < 0) {
            groundPieces.removeAt(groundPieces.indexOf(value22))
            value22.destroy()
        }
    }
    if (!(groundHasGaps)) {
        for (let index32 = 0; index32 <= groundPieces.length - 1; index32++) {
            aGround = groundPieces[index32]
            if (index32 + 1 < groundPieces.length) {
                nextGroundPiece = groundPieces[index32 + 1]
                nextGroundPiece.left = aGround.right
            }
        }
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    facingRight = false
})
function reduceEnergyOverTime () {
    if (!(dying)) {
        if (energyLastLostTime < game.runtime()) {
            energyLastLostTime = game.runtime() + eneryLostEveryMs
            playerEnergy.value += energyLostEachTime * -1
        }
    }
}
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
    for (let value222 of weaponImagesRight) {
        anImage = value222.clone()
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
    treeImage = img`
        8888667777777777777777776666667666677777777777777777766666696666777777777777777777666666d666677777777777777777766666696666777777777777777777666667d666677777777777777777766888888888
        888667777777777777777777766666666677777777777777777777666666666777777777777777777776666666667777777777777777777766666666677777777777777777777666666666777777777777777777776688666888
        886677777777777777777777776666666777777777777777777777766666677777777777777777777776666666777777777777777777777776666667777777777777777777777666666677777777777777777777776666666688
        886777777777777777777777776666667777777777777777777777766666677777777777777777777777666666777777777777777777777776666667777777777777777777777766666677777777777777777777776666666688
        886777777777777777777777776666677777777777777777777777766666777777777777777777777777666667777777777777777777777776666677777777777777777777777766666777777777777777777777776666666688
        886777777777777777777777776666677777777777777777777777766666777777777777777777777777666667777777777777777777777776666677777777777777777777777766666777777777777777777777776666666688
        8867777777777777777777d7776666677777777777777777777177766666777777777777777777771777666667777777777777777777717776666677777777777777777777177766666777777777777777777771776666666688
        88677777777777777777771777666667777777777777777777d1777666667777777777777777777d1777666667777777777777777777d1777666667777777777777777777d1777666667777777777777777777d1776666666668
        8867777777777777777771177766666777777777777777777d117776666677777777777777777711177766666777777777777777777d117776666677777777777777777711177766666777777777777777777111776666666668
        8867dd777777777777771177766666677177777777777777d1d7776666667717777777777777711d77766666677177777777777777d1d7776666667717777777777777711d7776666667717777777777777711d7776666666668
        8867d1d77777777777ddd77776666667711d77777777777ddd77776666667711d77777777777ddd77776666667711777777777777ddd77776666667711d77777777777ddd7777666666771177777777777dddd77766666666688
        886771177777777777777777666666667711777777777777777766666666677117777777777777777666666666771d777777777777777766666666677117777777777777777666666666771d7777777777777777666666666688
        886677177777777777776766666666666771777777777777776666666666667717777777777776766666666666677d777777777777776666666666667717777777777776766666666666677d7777777777776766666666666668
        88666777777777777776666cc666666666777777777777776666cc666666666777777777777766666cc666666666777777777777776666cc666666666777777777777766666cc666666666777777777777766666c66666666688
        8866666677777766666666cccf6666666666677777666666666fccf6666666666677777666666666fccf6666666666677777666666666fccf6666666666677777666666666fccf6666666666677777666666666fcf6666668888
        88866666666666666666cfc666ff666666666666666666666ff6666ff666666666666666666666ff666cf6666666666666666666666ff6666ff666666666666666666666ff666cf6666666666666666666666ff666ff66668888
        8888866666666666cccff6666666ffccc666666666666cccff666666cfcccc666666666666ccffc666666cfcccc666666666666cccff666666cfcccc666666666666ccffc666666cfcccc66666666666cccffc666666ffcc8888
        88888fffffffffffffffffff666666cffffffffffffffffffffff66666ccffffffffffffffffffffff66666ccffffffffffffffffffffff66666ccffffffffffffffffffffff66666ccfffffffffffffffffffffc66666cc8888
        8888888fffffffffffffeffeeffffeefffff8888888ffffffffefffffffffffffffffffffffffefffeefffeeffffffffffffffffffffffeefffeeffffffffffffffffffefffeefffeefffff88888888ffffffffeffffffff8888
        8888888ffffffffffffeeeeeeeffeeeeffff8888888fffeefeeefffeef888fffffffffffffffeeefeeeefeeeefffffffffffffffffeefeeeeffeeeffffffffffffffffeeefeeeefeeeeffff88888888ffeeffeeeffe4ff888888
        88888888ffffeffffffeeeeeeeeeeeeec888888888888feeeee4f8f4ef8888888cfffeefffffeeeeeeeeeeeeeffeefffffffffffffeeeeeeeeeeeeffe4ffffffffffffeeeeeeeeeeeeef8888888888888eeeeeeeffe4ff888888
        8888888888feeefffffeeeeeeeeeeeee8888888888888feeee44f8f4ef888888888cee4effffeeeeeeeeeeeeeffeec8fefffffffffeeeeeeeeeeeeffe4f8efffffffffeeeeeeeeeeeeef8888888888888eeeee44cce4ff888888
        8888888888fe44effffeeeee44444eee8888888888888feeee44f8f4ef888888888ce444ffffeeee4e4444eeefeee88feefe4fffffeee4e4444eeefee4f6eeffe4ffffeeee4e4444eeef8888888888888eeeee44cce4ff888888
        8888888888cee44f88feeeee4444444e8888888888888feeee44ffe4ef8888888888ee444f88eeee4e4444444fee4effefee44ffefeee4e4444444fee4efeefee44feeeeee4e4444444f8888888888888eeeee44fe44fc888888
        88888888888fe44eccfeeeee4444444e8888888888888feeee44fe44c88888888888fe444ecfeeee4e4444444ffeeeefefe444efffeee4e4444444ffee4eeefe444effeeee4e4444444f8888888888888eeeee44fe4e88888888
        88888888888fee44eefeeeee4444444e8888888888888feeee44feeef88888888888fee444eeeeee4e4444444fffeeffeeee444eefeee4e4444444fffeefeefee444eeeeee4e4444444f8888888888888eeee444feef88888888
        888888888888feeeeefeeeee4444444e8888888888888feeee44feec8888888888888feeeeeeeeee4e4444444f8fffffe4eeeeeeefeee4e4444444f8cfffee4feeeeeeeeee4e4444444f8888888888888eeeee44fec888888888
        888888888888ceeeeefeeeee4444444e8888888888888feeeee4f88888888888888888eeeeeeeeee4e4444444f888cffe4eeeeeeefeee4e4444444f8888fee4eeeeeeeeeee4e4444444f8888888888888eeeeee4f88888888888
        8888888888888cfeeefeeeee4444444e8888888888888feeee44f888888888888888888ffeeeeeee4e4444444f88888fe44effeeefeee4e4444444f88888ee44effeeeeeee4e4444444f8888888888888eeeee44c88888888888
        888888888888888ffefeeeee4444444e8888888888888feeee44f88888888888888888888ffeeeee4e4444444f88888feee44fffefeee4e4444444f88888eee444fffeeeee4e4444444f8888888888888eeeee44c88888888888
        888888888888888888feeeee4444444e8888888888888eeeee44e8888888888888888888888feeee4e4444444f88888eee444f88cfeee4e4444444f8888cee4444f88feeee4e4444444f888888888888ceeeee44c88888888888
        888888888888888888feeeee4444444e888888888888feeeee444f8888888888888888888888eeee4e4444444f8888feee444f888feee4e4444444f8888fee4444f888eeee4e4444444f888888888888eeeeee44e88888888888
        888888888888888888feeeee4444444eff8888888888feeeee444f8888888888888888888888eeee4e4444444fff88feee444f888feee4e4444444fff88fee4444f888eeee4e4444444fff8888888888eeeeee44e88888888888
        888888888888888888feeeee44444eee44f888888888feeeee444f8888888888888888888888eeee4e4444efe444ccfeeeeeef84efeee4e44444ee444f8feee4eef84eeeee4e4444efe444c888888888eeeeee44e88888888888
        888888888888888888feeeee44444fe4444f88888888feeeee444f8888888888888888888888eeee4e4444fe4444effeeeeeee4effeee4e4444ee44444ffee4eeee4efeeee4e4444fe4444e888888888eeeeee44e88888888888
        888888888888888888feeeee44444fee44f888888888feeeee444f8888888888888888888888eeee4e4444feee4ec8feeeee4eef8feee4e4444eeee44f8fee4f44eec8eeee4e4444feee4ec888888888eeeeee44e88888888888
        888888888888888888feeeee44444effff8888888888feeeeee44f888888888888888888888ceeeeee4444efffff88feee4ffff88feeeee44444effff88fee44ffff8ceeeeee4444effffc8888888888eeeeeee4e88888888888
        88888888888888888feeeeee444444eef88888888888feeeeee44f888888888888888888888eeee4e444444eeef888feeee444f8feee4e444444eeef888feee4444f8eeee4e444444eeef88888888888eeeeeee4e88888888888
        88888888888888888feeeeee44444444f88888888888feeeee444f888888888888888888888eeee4e444444444f888feeee444f8feee4e444444444f888feee4444f8eeee4e444444444f88888888888eeeeee44e88888888888
        88888888888888888feeeeee44444444f88888888888feeee4444f888888888888888888888eeee4e444444444f888feeee444f8feee4e444444444f888feee4444f8eeee4e444444444f88888888888eeee4444e88888888888
        88888888888888888feeeeee44444444f88888888888feeeee444f888888888888888888888eeee4e444444444f888feeee444f8feee4e444444444f888feee4444f8eeee4e444444444f88888888888eeeeee44e88888888888
        88888888888888888feeeeee44444444f88888888888feeeee444f888888888888888888888eeee4e444444444f888feeee444f8feee4e444444444f888feee4444f8eeee4e444444444f88888888888eeeeee44e88888888888
        88888888888888888feeeeee44444444f88888888888feeeee444f888888888888888888888eeee4e444444444f888feeee444f8feee4e444444444f888feee4444f8eeee4e444444444f88888888888eeeeee44e88888888888
        8888888888888888feeeeee4444444444f8888888888feeeee444f88888888888888888888feee4e44444444444f88feeee4444feeeee44444444444f88feeee444efeee4e44444444444f888888888feeeee444e88888888888
        8888888888888888feeeeee4444444444f8888888888feeeee444f88888888888888888888feee4e44444444444f88feeee4444feeeee44444444444f88feeee444efeee4e44444444444f888888888feeeeee44e88888888888
        8888888888888888feeeeee4444444444f8888888888feeeee444f88888888888888888888feee4e44444444444f88fccee4444feeeee44444444444f88ffeee444efeee4e44444444444f888888888feeeeee44e88888888888
        8888888888888888feeeeee4444444444f8888888888feeeee444f88888888888888888888feee4e44444444444f88ffceeeee4feeeee44444444444f88ffeeee44efeee4e44444444444f88888888cfeeee4444e88888888888
        8888888888888888feeeeee4444444444f8888888888feeeee444f88888888888888888888feee4e44444444444f8888ffe4444feeeee44444444444f888ffeee444feee4e44444444444f88888888cfeeeee444e88888888888
        8888888888888888feeeeee4444444444f8888888888feeeee444f88888888888888888888feee4e44444444444f88888fee4444eeeee44444444444f8888ffee444feee4e44444444444f88888888cfeeeee4e4e88888888888
        888888888888888feeeeee444444444444f88888888feeeeee4444f888888888888888888feeeee4444444444444f8888ffee44eeeeee444444444444f8888ffee444ee4e4444444444444f8888888cfeeeee444ec8888888888
        888888888888888feeee4e444444444444f88888888feeeeee4444f888888888888888888feee4e4444444444444f88888ffe44eeeee4444444444444f88888ffee44ee4e4444444444444f8888888cfeeeeee44ec8888888888
        888888888888888feeee4e444444444444f88888888feeeeee4444f888888888888888888feee4e4444444444444f888888feeeeeeee4444444444444f888888fee44ee4e4444444444444f8888888cfeeeeee44ec8888888888
        888888888888888feeee4e444444444444f88888888feeeee44444f888888888888888888feee4e4444444444444f888888ffffeeeee4444444444444f888888ffee4ee4e4444444444444f8888888cfeeee4444ec8888888888
        888888888888888feeee4e444444444444f88888888feeeee44444f888888888888888888feee4e4444444444444f888888888feeeee4444444444444f8888888fffeee4e4444444444444f8888888cfeeee4444ec8888888888
        888888888888888feeee4e444444444444f88888888feeeeee4444f888888888888888888feee4e4444444444444f888888888feeeee4444444444444f88888888ffeee4e4444444444444f8888888cfeeeee444ec8888888888
        888888888888888feeee4e444444444444f88888888feeeeee4444f888888888888888888feee4e4444444444444f888888888feeeee4444444444444f888888888feee4e4444444444444f8888888cfeeeee4444ec888888888
        888888888888888feeee4e444444444444f88888888feeeee44444f888888888888888888feee4e4444444444444f888888888feeeee4444444444444f888888888feee4e4444444444444f8888888cfeeee44444ec888888888
        888888888888888feeee4e444444444444f88888888feeeeee4444f888888888888888888feee4e4444444444444f888888888feeeee4444444444444f888888888feee4e4444444444444f8888888cfeeeeee444ec888888888
        888888888888888feeee4e444444444444f88888888feeeee44444f888888888888888888feee4e4444444444444f888888888feeeee4444444444444f888888888feee4e4444444444444f8888888cfeeee44444ec888888888
        888888888888888feeee4e444444444444f88888888feeeee44444f888888888888888888feee4e4444444444444f888888888feeeee4444444444444f888888888feee4e4444444444444f8888888cfeeee44444ec888888888
        888888888888888feeee4e444444444444f88888888feeeeee4444f888888888888888888feee4e4444444444444f888888888feeeee4444444444444f888888888feee4e4444444444444f8888888cfeeeee4444ec888888888
        88888888888888ceeeeeee444444444444ec8888888feeeeee4444f88888888888888888ceeeeee4444444444444ec8888888ceeeeee4444444444444ec8888888ceeeeee4444444444444ec888888cfeeeee4444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeee44444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeeee4444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeeee4444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeeeee444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeee44444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeee44444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeee44444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeee44444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeeee4444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeeee4444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeee44444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeeee4444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeeee4444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeeee4444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeee44444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeeeee444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeeee4444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeee44444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeee44444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeee44444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeee44444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeeee4444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeeee4444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeeeee444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeee44444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeee44444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeeee4444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeeee4444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeee44444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeeeee444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeeee4444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeee44444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeee44444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeee44444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeee44444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeeee4444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeeee4444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeeee4444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeee44444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeeee4444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeee44444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeeeee444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeeee4444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeee44444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeee44444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeeee4444ec888888888
        88888888888888feeee4e44444444444444f8888888feeeee44444f88888888888888888feeeee44444444444444ec8888888feeeeee44444444444444f8888888feeeee44444444444444ec888888cfeeeeee444ec888888888
        88888888888888feeee4e44444444444444f8888888fee7eee4744f87888888888888888feeeee44444444444444ec8888888feeeeee44444444444744f8888888feeeee44444444444444ec888888cfeeee44444ec888888888
        88888888888888feeee4e44444444444444f8888877fe7eee44474f77788888888888888feeeee44444444444444ec8888888feeeeee44447444447744f8888888feeeee44444444444444ec888888cfeeee44444ec888888888
        88888888888888feeee4e44444444444444f8887777cee7e77477ef77777788888888888feeeee44444444444444ec8888887feeeeee74444744474444f7788888feeeee44444444444444ec888888cfeeeeee444ec888888888
        88888888888888feeee4e44444444444444f88877777c7ec777777c77777777778888888feeeee44444444444444ec8887777feeeeee474777747477e4f7778887fee77e44444444444444ec888888cfeeee44444ec888888888
        88888888888888feeee4e44444444444444f887777777777777777777777777777788888feeeee44444444444444ec8877777ceeeeee74477777747777f7777777feeee744447e44444474ec888888cfe7eee4444ec888888888
        88888888888888feeee4e44444444444444f877777777777777777777777777777777888feeeee44444444444444ec88777777ceec777c777777777777c7777777feeee744447777444744ec888877cfee7744774ec888888888
        88888888888888feeee4e44444444444444f777777777777777777777777777777777777feeeee47444474444744ec777777777777777777777777777777777777ceeeec77447777747444ec7777777ceee74c7e4ec788888888
        88888888888888feeee4e44444444444444f777777777777777777777777777777777777feeeee74447774447744ec77777777777777777777777777777777777777ee7777777777747444ec777777777eee7774477777888888
        88888888888888fee7e4e44744444447444f777777777777777777777777777777777777ceeeee774477774777e4ec77777777777777777777777777777777777777777777777777777444ec7777777777e7777e777777778888
        88888888888777fe77e4744774444477444f7777777777777777777777777777777777777ceec777777777777777ec77777777777777777777777777777777777777777777777777777774ec7777777777777777777777777888
        88888888888777f7eee7744777444777444f777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777888
        88888877777777ce7e7777447774777774ef777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777888
        888887777777777c7777777777777777777c777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777788
        877777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777788
        877777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777788
        777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        `
    treeWidth = 180
}
function getNextGroundPiece () {
    groundMaximumX = 0
    for (let value2222 of groundPieces) {
        if (value2222.right > groundMaximumX) {
            groundMaximumX = value2222.right
        }
    }
    if (groundMaximumX < screenWidth - gap) {
        setRandomGround()
        setNextGap()
    }
}
function enemyDies (anEnemy: Sprite, dyingImage: Image) {
    sprites.setDataNumber(anEnemy, dataSpeedX, 0)
    animation.stopAnimation(animation.AnimationTypes.All, anEnemy)
    anEnemy.setImage(dyingImage)
    anEnemy.vy = -150
    anEnemy.ay = 400
    anEnemy.setKind(SpriteKind.EnemyDying)
}
function moveScreenElements () {
    gameSpeed = 0
    if (dude.vx > 0) {
        gameSpeed = dude.vx * -1
    } else {
        for (let value4 of screenElements) {
            if (value4.right < 0) {
                removeScreenElement(value4, true)
            }
        }
        for (let value32 of groundPieces) {
            value32.vx = 0
        }
        for (let value42 of screenElements) {
            spriteSpeedX = sprites.readDataNumber(value42, dataSpeedX)
            if (spriteSpeedX) {
                value42.vx = spriteSpeedX
            } else {
                value42.vx = 0
            }
        }
    }
    if (dude.x + 1 > playerCannotMovePast && dude.vx > 0) {
        for (let value5 of groundPieces) {
            value5.vx = gameSpeed
        }
        for (let value6 of screenElements) {
            spriteSpeedX = sprites.readDataNumber(value6, dataSpeedX)
            if (spriteSpeedX) {
                value6.vx = gameSpeed - spriteSpeedX
            } else {
                value6.vx = gameSpeed
            }
        }
    }
}
function spawnTrees () {
    treeLocationsLevel = treeLocations[getLevelIndex()]
    if (treeLocationsLevel.length > 0) {
        aLocation = treeLocationsLevel[0]
        if (aLocation <= distanceExploredForLevel) {
            aLocation = treeLocationsLevel.removeAt(0)
            treeSprite = sprites.create(treeImage, SpriteKind.Tree)
            treeSprite.z = -10
            placeOnGroundOutsideScreen(treeSprite)
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
    groundPieces = [aGround]
    increaseDistanceExplored(aGround.width)
    setNextGap()
}
function playerDies () {
    if (!(dying)) {
        dying = true
        dude.setKind(SpriteKind.PlayerDead)
        playerEnergy.value = 0
        animation.stopAnimation(animation.AnimationTypes.All, dude)
        character.setCharacterAnimationsEnabled(dude, false)
        dude.setImage(dyingImages[1])
        controller.moveSprite(dude, 0, 0)
        dude.vy += -200
        for (let value of screenElements) {
            value.vx = 0
            value.vy = 0
        }
        for (let value of groundPieces) {
            value.vx = 0
            value.vy = 0
        }
        timer.after(250, function () {
            animation.runImageAnimation(
            dude,
            dyingImages,
            250,
            false
            )
            timer.after(500, function () {
                animation.stopAnimation(animation.AnimationTypes.All, dude)
                dude.setImage(dyingImages[0])
                timer.after(500, function () {
                    restartInLevel()
                })
            })
        })
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    facingRight = true
})
function spawnSpiders () {
    spiderLocationsLevel = spiderLocations[getLevelIndex()]
    if (spiderLocationsLevel.length > 0) {
        anEnemyLocation = spiderLocationsLevel[0]
        if (anEnemyLocation <= distanceExploredForLevel) {
            anEnemyLocation = spiderLocationsLevel.removeAt(0)
            spiderSprite = sprites.create(spiderImages[0], SpriteKind.Spider)
            spiderSprite.bottom = maximumHeightForItems
            sprites.setDataNumber(spiderSprite, dataSpeedY, spiderSpeed)
            sprites.setDataNumber(spiderSprite, dataPoints, 20)
            sprites.setDataBoolean(spiderSprite, dataCanMoveUpAndDown, true)
            if (sprites.readDataBoolean(spiderSprite, dataCanMoveUpAndDown)) {
                spriteBottom = getYBetweenTopAndGround()
            } else {
                spriteBottom = getYBetweenPlayerTopAndGround()
            }
            spiderSprite.vy = spiderSpeed
            animation.runImageAnimation(
            spiderSprite,
            spiderImages,
            250,
            true
            )
            placeOutsideScreen(spiderSprite, spriteBottom)
            addSpriteToBeRemovedWhenDying(spiderSprite)
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Rock, function (sprite, otherSprite) {
    if (!(takingDamage)) {
        reduceEnergy(10)
        playerTakesDamage(false, otherSprite)
    }
})
function spawnEnemies () {
    spawnSnails()
    spawnSnakes()
    spawnSpiders()
}
function setTrees () {
    treeLocations = [[
    192,
    384,
    576,
    768,
    960,
    1152,
    1344
    ], [256, 300]]
    treeLocationsLevelTemp = []
    if (testing) {
        for (let index2 = 0; index2 <= getLevelIndex() - 1; index2++) {
            treeLocations.shift()
        }
        if (treeLocations.length > 0) {
            treeLocationsLevel = treeLocations[getLevelIndex()]
            for (let value2 of treeLocationsLevel) {
                if (value2 >= distanceExploredForLevel) {
                    treeLocationsLevelTemp.push(value2)
                }
            }
            treeLocations[getLevelIndex()] = treeLocationsLevelTemp
        }
    }
}
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
    fallingImagesRight = [img`
        .......................
        ........545............
        .......545444555.......
        ........5e45555555.....
        .......f44545511155....
        ......f4554444511155...
        ......f4554445555115...
        .....f445444555455455..
        .....f444444554515415..
        .....f4444e555e15e515..
        .....f44de55eeeeede44..
        .....f54de5eedd11d1d...
        .....f544e5edd111d11ed.
        .....f55445edd11fdf1ed.
        ...ddd44455edddddddded.
        ..dddddd445edd22112ed..
        ..dddedddd44edd222d....
        ..fdeeeedddeeedddd.....
        ...fffffedddeeeee......
        ....ee66edddeeeee......
        ...eeee6eddddeeee......
        ..fedd6eddddddee.......
        ..fedd76edddddee.......
        ..fdd7766eeeeee........
        ...fff6667777ff........
        .....f66e77777f........
        ......fee777777........
        .....feeeee77f.........
        .....feeddfff..........
        .....feddd.............
        ......fdd..............
        .......ff..............
        `, img`
        .......................
        ...5...55555...........
        .554e555551155.........
        ..4e45455555115........
        .55454544555515........
        ...f444455555555.......
        ...f444455155515.......
        ..f44445551e55e55......
        ..f44455e55e5ee55......
        ..f44555e5eeddde5......
        ..f44555eed11d1d5......
        ..f44de5ee11fdf15......
        ..f44de5ed11fdf15......
        ...f445eeedddddd5......
        ...f4455eeddd1dd.......
        ...f4455eeddd2dd.......
        ....f4455eedddd5.......
        .....ffdddeeee5........
        .....fdddddddd.........
        ....fddddeddddd........
        ....fddddeedddd........
        ....fddddddeddd........
        ..ff66ddddddedd........
        .f666666dddde77dd......
        ..f666666dd77ddddd.dd..
        .f6f666777777edddddddd.
        ..fe66666677eeeeeddddd.
        .fee66ddf7ffffffeedddf.
        .feeddd..f......feeef..
        .feddd...........fff...
        ..fddd.................
        ...ff..................
        `]
    fallingImagesLeft = [img`
        .......................
        ...................5...
        ............55555..55..
        ..........5555555554555
        .........555555445554..
        ........5555555544555f.
        ........5555555555455f.
        .......55e55e554554554f
        .......55ee5ee54555454f
        .......5ed1d11e4e55444f
        ........d11d111ee54444f
        ........d1fdf11eee444f.
        ........dddddddee5444f.
        ........dd21ddee55444f.
        ........dd222ded5444f..
        .........ddddee55444f..
        .........eeeedd5d44f...
        ........ddddddddddf....
        .......ddddddddddddf...
        .dd...edddddddeedddf...
        dddd.66eeddddeeeedddf..
        dddddd677eeeeeefedddf..
        .eeddde77777eef.edddf..
        .feeeee677776666.edf...
        ..feeff677767666.ff....
        ...ff...76e66666f......
        ..........de66f6f......
        .........dddef.f.......
        .........dddef.........
        ........dddeef.........
        ........ddeef..........
        .........fff...........
        `, img`
        .......................
        ...........55555...5...
        .........551155555e455.
        ........51155555454e4..
        ........51555544545455.
        .......555555554444f...
        .......515551554444f...
        ......55e55e15554444f..
        ......55ee5e55e55444f..
        ......5edddee5e55544f..
        ......5d1d11dee55544f..
        ......51fdf11ee5ed44f..
        ......51fdf11de5ed44f..
        ......5ddddddeee544f...
        .......dd1dddee5544f...
        .......dd2dddee5544f...
        .......5ddddee5544f....
        ........5eeeedddff.....
        .........ddddddddf.....
        ........dddddeddddf....
        ........ddddeeddddf....
        ........dddeddddddf....
        ........ddedddddd66ff..
        ......dd77edddd666666f.
        ..dd.ddddd77dd666666f..
        .dddddddde777777666f6f.
        .dddddeeeee77666666ef..
        .fdddeeffffff7fdd66eef.
        ..feeef......f..dddeef.
        ...fff...........dddef.
        .................dddf..
        ..................ff...
        `]
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
    dyingImages = [img`
        ............5.5........
        .............455.......
        ........55554ee........
        ......555555554........
        .....55445555554.......
        ....554455555555.......
        ....5445555555555......
        ...555e55e555e555......
        ..5545de5e55ed555......
        ...45edded5eddd555.....
        ...55ed111d111d155.....
        ..554e11f111f115545....
        .dd44111111111154dd....
        dddd4ed111d111d5dddd...
        dddddedddd1dddd5ddde...
        feeedeeddd2dddedddef...
        .ffeddeedddddedddef....
        ...fedddeeeee5deef.....
        ....feedddddddeef......
        .....fedddddddef....dd.
        ......eedddddde....dddd
        ......eeeddddde.dddddde
        .....666eeedde7ddddddef
        ....6666777777dddeeeeef
        ...66de6777776eeeffeef.
        ...fddee67776eeff..ff..
        ....ddde6677fff........
        .....ddee66f...........
        ....ddddeff............
        ....dddef..............
        ....ddef...............
        .....ff................
        `, img`
        .......................
        .............5.5.......
        ..............4555.....
        .........55555ee5......
        .......554445555.......
        ......54445555555......
        .....5444555555555.....
        .....5455555555555.....
        ....445e55e555e5554....
        ....445ee5e55ee5554....
        ....455eded5edde544....
        ....4eed111d111de44....
        ....45e111f1f111d44....
        ....45e111111111154....
        ....45ed111d111dd54....
        .....5edddd1ddddd5.....
        .....45eddd2dddd55.....
        .dddddd5eedddde5dddd...
        dddeddd5deeeee5ddddddd.
        dddeeeeeddddddddeedddd.
        ddeefffedddddddefeedd..
        .fff...eedddddde.fff...
        ...dd66eeeddddde.......
        ..dddd666eeedde7.......
        ..ddddd667777776ddd....
        ..fddddd6777776edddd.dd
        ...fdddd667776eeeedeedd
        ....fddff677fffeeeeeddd
        .....ff..f7f...fffedddd
        ..........f.....efedddf
        ..................fddf.
        ...................ff..
        `]
}
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.Spider, function (sprite, otherSprite) {
    info.changeScoreBy(sprites.readDataNumber(otherSprite, dataPoints))
    sprite.destroy()
    enemyDies(otherSprite, spiderImageDying)
})
function checkLevelFromDistance () {
    if (distanceExploredForLevel > changeLevelAfterDistanceOf) {
        level += 1
        distanceExploredForLevel = 0
    }
}
function addEnergy (aSprite: Sprite) {
    playerEnergy.value += sprites.readDataNumber(aSprite, dataEnergy)
}
function playerTakesDamage (destroySprite: boolean, aSprite: Sprite) {
    if (destroySprite) {
    	
    }
    controller.moveSprite(dude, 0, 0)
    takingDamage = true
    animation.stopAnimation(animation.AnimationTypes.All, dude)
    character.setCharacterAnimationsEnabled(dude, false)
    dude.vy = -100
    if (facingRight) {
        animation.runImageAnimation(
        dude,
        fallingImagesRight,
        500,
        false
        )
        dude.vx = 85
    } else {
        animation.runImageAnimation(
        dude,
        fallingImagesLeft,
        500,
        false
        )
        dude.vx = 50
    }
    timer.after(600, function () {
        controller.moveSprite(dude, walkingSpeed, 0)
        character.setCharacterAnimationsEnabled(dude, false)
        takingDamage = false
    })
}
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.Snail, function (sprite, otherSprite) {
    info.changeScoreBy(sprites.readDataNumber(otherSprite, dataPoints))
    sprite.destroy()
    enemyDies(otherSprite, snailImageDying)
})
function checkOnGround () {
    if (!(dying)) {
        onGround = false
        for (let value8 of groundPieces) {
            if (!(onGround)) {
                if (dude.overlapsWith(value8)) {
                    while (dude.overlapsWith(value8)) {
                        dude.y += -0.5
                    }
                    setPlayerOnGround(value8)
                }
            }
        }
    }
}
function setSpiders () {
    spiderSpeed = 20
    spiderImageDying = img`
        ........4b5........
        .......4b555.......
        ......224bddd......
        .....224bddddd.....
        .....44bdddd55.....
        ....44bbddd5555....
        ....2244bbbbddd....
        ....2244bbbbddd....
        ....44bbdddd555....
        .....4bbbddd55.....
        ....7722bb55177....
        ...7...72227...7...
        ..7..77.445.77..7..
        ..7.7..74457..7.7..
        ...7..7..f..7..7...
        ...7.7..2f2..7.7...
        ...7.7.55.55.7.7...
        ...7.7.5...5.7.7...
        .....7..5.5..7.....
        `
    spiderImages = [img`
        ........cc6........
        .......cc866.......
        ......4455551......
        .....445555551.....
        .....cc8888866.....
        ....ccc88888666....
        ....44555555551....
        ....44555555551....
        ....ccc88888666....
        ..55bcc8888666b55..
        .5..55445555155..5.
        5......5c885......5
        5....55b445b55....5
        ...55..54455..55...
        ..5...5..f..5...5..
        .5...5..2f2..5...5.
        .5..5..55.55..5..5.
        ....5..5...5..5....
        ....5...5.5...5....
        `, img`
        ........cc6........
        .......cc866.......
        ......4455551......
        .....445555551.....
        .....cc8888866.....
        ....ccc88888666....
        ....44555555551....
        ....44555555551....
        ....ccc88888666....
        .....cc8888666.....
        ....55445555155....
        ..55...5c885...55..
        .5...55b445b55...5.
        .5..5..54455..5..5.
        ...5..5..f..5..5...
        ..5..5..2f2..5..5..
        ..5..5.55.55.5..5..
        ..5..5.5...5.5..5..
        .....5..5.5..5.....
        `]
    spiderLocations = [[1104, 1152], [1248, 1312]]
    spiderLocationsLevelTemp = []
    if (testing) {
        for (let index = 0; index <= getLevelIndex() - 1; index++) {
            spiderLocations.shift()
        }
        if (spiderLocations.length > 0) {
            spiderLocationsLevel = spiderLocations[getLevelIndex()]
            for (let value of spiderLocationsLevel) {
                if (value >= distanceExploredForLevel) {
                    spiderLocationsLevelTemp.push(value)
                }
            }
            spiderLocations[getLevelIndex()] = spiderLocationsLevelTemp
        }
    }
}
function reduceEnergy (amount: number) {
    playerEnergy.value += amount * -1
}
function setEnemies () {
    setSnails()
    setSnakes()
    setSpiders()
}
function spawnSnakes () {
    snakeLocationsLevel = snakeLocations[getLevelIndex()]
    if (snakeLocationsLevel.length > 0) {
        anEnemyLocation = snakeLocationsLevel[0]
        if (anEnemyLocation <= distanceExploredForLevel) {
            anEnemyLocation = snakeLocationsLevel.removeAt(0)
            snakeSprite = sprites.create(img`
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                .........................
                ............77777........
                ..........777777557......
                `, SpriteKind.Snake)
            sprites.setDataNumber(snakeSprite, dataDamage, 30)
            sprites.setDataNumber(snakeSprite, dataPoints, 30)
            placeOnGround(snakeSprite, screenWidth / 2)
            addSpriteToBeRemovedWhenDying(snakeSprite)
            animation.runImageAnimation(
            snakeSprite,
            snakeImagesAppearing,
            100,
            false
            )
            timer.after(500, function () {
                animation.runImageAnimation(
                snakeSprite,
                snakeImages,
                200,
                true
                )
            })
        }
    }
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
    aGround.z = aGround.bottom
    groundPieces.push(aGround)
    increaseDistanceExplored(aGround.width)
}
function checkPlayerPosition () {
    if (dude.x > playerCannotMovePast) {
        dude.x = playerCannotMovePast
    } else if (dude.x < playerStartsAt) {
        dude.x = playerStartsAt
    }
    if (dude.top > screenHeight) {
        if (!(dying)) {
            playerDies()
        }
    }
    dude.say(distanceExploredForLevel)
}
function getYBetweenTopAndGround () {
    return randint(minimumHeightForItems, maximumHeightForItems)
}
function spawnSnails () {
    snailLocationsLevel = snailLocations[getLevelIndex()]
    if (snailLocationsLevel.length > 0) {
        anEnemyLocation = snailLocationsLevel[0]
        if (anEnemyLocation <= distanceExploredForLevel) {
            anEnemyLocation = snailLocationsLevel.removeAt(0)
            snailSprite = sprites.create(snailImages[0], SpriteKind.Snail)
            sprites.setDataNumber(snailSprite, dataSpeedX, snailSpeed)
            sprites.setDataNumber(snailSprite, dataDamage, 15)
            sprites.setDataNumber(snailSprite, dataPoints, 10)
            animation.runImageAnimation(
            snailSprite,
            snailImages,
            500,
            true
            )
            placeOnGroundOutsideScreen(snailSprite)
            addSpriteToBeRemovedWhenDying(snailSprite)
        }
    }
}
function checkPlayerOverlaps () {
    if (dude.overlapsWith(anEgg)) {
        playerGetsEgg()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    if (!(dying)) {
        showPoints(otherSprite)
        addEnergy(otherSprite)
        removeScreenElement(otherSprite, true)
    }
})
function placeOutsideScreen (aSprite: Sprite, bottom: number) {
    aSprite.bottom = bottom
    aSprite.left = screenWidth
    addScreenElement(aSprite)
}
function setNextGap () {
    if (groundHasGaps) {
        gap = randint(gapMinimum, gapMaximum)
    } else {
        gap = 0
    }
}
function placeOnGroundOutsideScreen (aSprite: Sprite) {
    aSprite.bottom = groundPieces[0].top
    aSprite.left = screenWidth
    addScreenElement(aSprite)
}
function getYBetweenPlayerTopAndGround () {
    return randint(playerTop + 3, maximumHeightForItems)
}
function playerGetsEgg () {
    if (!(canGetWeapon)) {
        removeScreenElement(anEgg, false)
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
function setSnakes () {
    snakeImageDying = img`
        ....2....7777.............
        22..2..77777755...........
        ..222.77e1177b77f.........
        ....22dee1eeb7777f........
        .....22eeeee1b7777f.......
        ......22eeee1fb777f.......
        .....ed22eeeefbb777f......
        ....eedee2eeefbb777f......
        ....eedeeeeef7bbb777f.....
        ...eeed1fee1f7bbb777f.....
        ...eeed1fff177bbbb77f.....
        ...eed77fff7777bbb77f.....
        ...eedd77f777ddbbb77f.....
        ...eed777777777bb77f......
        ...eeddd777dddbbb77f......
        ....eeddddddddbb77f.......
        ....eebbb77777bb77f.......
        .....edddddddbb77f........
        .....beddddddbb77f........
        .....bee77777b77f.........
        ......ebddddbb77f.........
        .......eddddbb77f.........
        .......ee777bb777f........
        ........eeddbbb777f...ff77
        .........beddbb7777fff777b
        ..........eddddb77777777b.
        ...........eedddbbb777be..
        .............eeddddeee....
        `
    snakeImages = [img`
        ............77777........
        ..........777777557......
        ..........7777755b77f....
        .........777777bb7777f...
        .........77777bffb7777f..
        .........7777bfeefb777f..
        ..222....edfffeeebbb777f.
        ...f2222eed222eeebbb777f.
        2222fff22222ffeeedbbb777f
        ..ff...fffffeeefddbbb777f
        .......eeedffffdddbbbb77f
        .......eeddddd77777bbb77f
        .......eeedddddddddbbb77f
        .......eee777777777bb77f.
        .......eedddddddddbbb77f.
        ........eeddddddddbb77f..
        ........eebbb77777bb77f..
        .........edddddddbb77f...
        .........beddddddbb7f....
        .........bee77777b7f.....
        ..........ebddddbb7f.....
        ..........ebddddb7f......
        ..........bee777b7f......
        ...........bdddbbf.......
        ...........bdd7bbf.......
        ...........be7bbf........
        ..........bbddbbf........
        `, img`
        ..........77777..........
        ........777777557........
        ........7777755b77f......
        .......777777bb7777f.....
        .......77777bffb7777f....
        .......7777bfeefb777f....
        .......edfffeeebbb777f...
        ......eedf22eeebbb777f...
        .....eee22ffeeedbbb777f..
        222..222ffeeefddbbb777f..
        fff22fffdffffdddbbbb77f..
        .22ffeeddddd77777bbb77f..
        ..f..eeedddddddddbbb77f..
        .....eee777777777bb77f...
        .....eedddddddddbbb77f...
        ......eeddddddddbb77f....
        ......eebbb77777bb77f....
        .......edddddddbb77f.....
        .......beddddddbb7f......
        .......bee77777b7f.......
        ........ebddddbb7f.......
        ........ebddddb7f........
        ........bee777b7f........
        .........bdddbbf.........
        .........bdd7bbf.........
        .........be7bbf..........
        ........bbddbbf..........
        `, img`
        ......77777..............
        ....777777557............
        ....7777755b77f..........
        ...777777bb7777f.........
        ...77777bffb7777f........
        ...7777bfeefb777f........
        ....ffffeeebbb777f.......
        ...edeeeeeebbb777f.......
        ..bbdee2eeebbbb777f......
        222bd22fefedbbb777f......
        fff22ffefeddbbbb77f......
        .22ffeeefe777bbb77f......
        .efdffffeddddbbb77f......
        .eee777777777bb77f.......
        .eedddddddddbbb77f.......
        ..eeddddddddbb77f........
        ..eebbb7777bbb77f........
        ...edddddddbbb7f.........
        ....eddddddbb77f.........
        .....ebbb77bb7f..........
        ......dddddbb7f..........
        .......dddddbb7f.........
        ........e777bbbf.........
        .........ddddbbbf........
        ..........ddddbbf........
        ...........e777bbf.......
        ............edddbf.......
        `]
    snakeImagesAppearing = [img`
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        ............77777........
        ..........777777557......
        `, img`
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        ............77777........
        ..........777777557......
        ..........7777755b77f....
        .........777777bb7777f...
        .........77777bffb7777f..
        .........7777bfeefb777f..
        ..222....edfffeeebbb777f.
        ...f2222eed222eeebbb777f.
        `, img`
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        ............77777........
        ..........777777557......
        ..........7777755b77f....
        .........777777bb7777f...
        .........77777bffb7777f..
        .........7777bfeefb777f..
        ..222....edfffeeebbb777f.
        ...f2222eed222eeebbb777f.
        2222fff22222ffeeedbbb777f
        ..ff...fffffeeefddbbb777f
        .......eeedffffdddbbbb77f
        .......eeddddd77777bbb77f
        .......eeedddddddddbbb77f
        .......eee777777777bb77f.
        `, img`
        .........................
        .........................
        .........................
        .........................
        .........................
        .........................
        ............77777........
        ..........777777557......
        ..........7777755b77f....
        .........777777bb7777f...
        .........77777bffb7777f..
        .........7777bfeefb777f..
        ..222....edfffeeebbb777f.
        ...f2222eed222eeebbb777f.
        2222fff22222ffeeedbbb777f
        ..ff...fffffeeefddbbb777f
        .......eeedffffdddbbbb77f
        .......eeddddd77777bbb77f
        .......eeedddddddddbbb77f
        .......eee777777777bb77f.
        .......eedddddddddbbb77f.
        ........eeddddddddbb77f..
        ........eebbb77777bb77f..
        .........edddddddbb77f...
        .........beddddddbb7f....
        .........bee77777b7f.....
        ..........ebddddbb7f.....
        `, img`
        ............77777........
        ..........777777557......
        ..........7777755b77f....
        .........777777bb7777f...
        .........77777bffb7777f..
        .........7777bfeefb777f..
        ..222....edfffeeebbb777f.
        ...f2222eed222eeebbb777f.
        2222fff22222ffeeedbbb777f
        ..ff...fffffeeefddbbb777f
        .......eeedffffdddbbbb77f
        .......eeddddd77777bbb77f
        .......eeedddddddddbbb77f
        .......eee777777777bb77f.
        .......eedddddddddbbb77f.
        ........eeddddddddbb77f..
        ........eebbb77777bb77f..
        .........edddddddbb77f...
        .........beddddddbb7f....
        .........bee77777b7f.....
        ..........ebddddbb7f.....
        ..........ebddddb7f......
        ..........bee777b7f......
        ...........bdddbbf.......
        ...........bdd7bbf.......
        ...........be7bbf........
        ..........bbddbbf........
        `]
    snakeLocations = [[902], [902]]
    snakeLocationsLevelTemp = []
    if (testing) {
        for (let index42 = 0; index42 <= getLevelIndex() - 1; index42++) {
            snakeLocations.shift()
        }
        if (snakeLocations.length > 0) {
            snakeLocationsLevel = snakeLocations[getLevelIndex()]
            for (let value9 of snakeLocationsLevel) {
                if (value9 >= distanceExploredForLevel) {
                    snakeLocationsLevelTemp.push(value9)
                }
            }
            snakeLocations[getLevelIndex()] = snakeLocationsLevelTemp
        }
    }
}
function playerThrowsWeapon () {
    if (hasWeapon && !(dying)) {
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
statusbars.onZero(StatusBarKind.Energy, function (status) {
    if (!(dying)) {
        dude.say("No vitality!")
        controller.moveSprite(dude, 0, 0)
        timer.after(1000, function () {
            dude.say("")
            playerDies()
        })
    }
})
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
        timer.after(1500, function () {
            removeScreenElement(pointsSprite, true)
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
function removeDyingEnemies () {
    for (let value92 of sprites.allOfKind(SpriteKind.EnemyDying)) {
        if (value92.top > screenHeight) {
            removeScreenElement(value92, true)
        }
    }
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
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.Snake, function (sprite, otherSprite) {
    info.changeScoreBy(sprites.readDataNumber(otherSprite, dataPoints))
    sprite.destroy()
    enemyDies(otherSprite, snakeImageDying)
})
function checkPlayer () {
    checkPlayerPosition()
    checkPlayerOverlaps()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Snail, function (sprite, otherSprite) {
    playerHitByEnemyLosesEnergy(otherSprite, snailImageDying)
})
let pointsSprite: Sprite = null
let pointsTaken = 0
let weaponSprite: Sprite = null
let snakeLocationsLevelTemp: number[] = []
let snakeImageDying: Image = null
let snailSprite: Sprite = null
let groundLength = 0
let snakeImages: Image[] = []
let snakeImagesAppearing: Image[] = []
let snakeSprite: Sprite = null
let snakeLocations: number[][] = []
let snakeLocationsLevel: number[] = []
let spiderLocationsLevelTemp: number[] = []
let spiderImageDying: Image = null
let jumpingImageLeft: Image = null
let jumpingImageRight: Image = null
let fallingImagesLeft: Image[] = []
let fallingImagesRight: Image[] = []
let throwingImagesLeft: Image[] = []
let throwingImagesRight: Image[] = []
let idleImagesLeft: Image[] = []
let treeLocationsLevelTemp: number[] = []
let spriteBottom = 0
let spiderSpeed = 0
let spiderImages: Image[] = []
let spiderSprite: Sprite = null
let anEnemyLocation = 0
let spiderLocations: number[][] = []
let spiderLocationsLevel: number[] = []
let dyingImages: Image[] = []
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
let treeLocations: number[][] = []
let treeLocationsLevel: number[] = []
let spriteSpeedX = 0
let gameSpeed = 0
let gap = 0
let groundMaximumX = 0
let treeWidth = 0
let pointsImages: Image[] = []
let anImage: Image = null
let weaponImagesLeft: Image[] = []
let weaponImagesRight: Image[] = []
let nextGroundPiece: Sprite = null
let aGround: Sprite = null
let foodLocationsLevelTemp: number[][] = []
let dataCanMoveUpAndDown = ""
let dataSpeedY = ""
let dataSpeedX = ""
let gapMaximum = 0
let gapMinimum = 0
let playerTop = 0
let playerCannotMovePast = 0
let changeLevelAfterDistanceOf = 0
let canGetWeapon = false
let groundHasGaps = false
let inLevel: number[] = []
let showingIntroduction = false
let groundHasGapsAfterLevel = 0
let area = 0
let level = 0
let screenHeight = 0
let weapon: Sprite = null
let foodEnergies: number[] = []
let dataEnergy = ""
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
let screenWidth = 0
let idleImagesRight: Image[] = []
let energyLastLostTime = 0
let energyLostEachTime = 0
let eneryLostEveryMs = 0
let weaponLastThrowTime = 0
let weaponThrownEveryMs = 0
let jumpSpeed = 0
let throwingWeapon = false
let onGround = false
let jumping = false
let dataDamage = ""
let reduceEnergy2 = 0
let takingDamage = false
let rockLocationsLevelTemp: number[] = []
let playerStartsAt = 0
let snailLocationsLevel: number[] = []
let snailLocationsLevelTemp: number[] = []
let snailLocations: number[][] = []
let snailImages: Image[] = []
let snailImageDying: Image = null
let snailSpeed = 0
let anEgg: Sprite = null
let distanceExplored = 0
let facingRight = false
let playerEnergy: StatusBarSprite = null
let dying = false
let groundPieces: Sprite[] = []
let screenElements: Sprite[] = []
let spritesToDestroyAfterDying: Sprite[] = []
let walkingImagesLeft: Image[] = []
let walkingSpeed = 0
let walkingImagesRight: Image[] = []
let dude: Sprite = null
let minimumHeightForItems = 0
let maximumHeightForItems = 0
let rockImage: Image = null
let rockSprite: Sprite = null
let distanceExploredForLevel = 0
let aLocation = 0
let rockLocations: number[][] = []
let rockLocationsLevel: number[] = []
let treeImage: Image = null
let treeSprite: Sprite = null
let testing = false
setVariables()
setFood()
setRocks()
setTrees()
setEnemies()
createBackgroundSprites()
setPlayer()
defineImages()
if (testing) {
    setEgg(20)
} else {
    setEgg(scene.screenWidth() * 2)
}
placeTrees(1, 0)
game.onUpdate(function () {
    if (showingIntroduction) {
    	
    } else if (inLevel) {
        checkGroundOffScreen()
        getNextGroundPiece()
        removeDyingEnemies()
        checkEnemyPosition()
        if (!(dying)) {
            reduceEnergyOverTime()
            moveScreenElements()
            checkOnGround()
            checkPlayer()
            spawnFood()
            spawnRocks()
            spawnTrees()
            spawnEnemies()
        }
    }
})
