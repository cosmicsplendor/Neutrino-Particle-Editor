
const clamp = (from = 0, to = 1, num) => Math.min(to, Math.max(from, num))

const projectOffset = (initialOffset=0, vel=0, acc=0, time=0) => initialOffset + (vel + 0.5 * acc * time) * time

const calc1DBounds = (offset, vel, acc, lifetime, len) => {
    const maxLifetime = lifetime[1]

    const minOffset = offset[0] 
    const maxOffset = offset[1]

    const minVel = vel[0] 
    const maxVel = vel[1]

    const minAcc = acc[0] 
    const maxAcc = acc[1]

    const limits = []
    
    limits[0] = projectOffset(minOffset, minVel, minAcc, maxLifetime)
    limits[1] = projectOffset(maxOffset, maxVel, maxAcc, maxLifetime)
    if (minAcc !== 0) {
        const inflexionTimeMin = clamp(0, maxLifetime, - minVel / minAcc)
        limits[2] = projectOffset(minOffset, minVel, minAcc, inflexionTimeMin)
    }
    if (maxAcc !== 0) {
        const inflexionTimeMax = clamp(0, maxLifetime, - maxVel / maxAcc)
        limits.push(projectOffset(maxOffset, maxVel, maxAcc, inflexionTimeMax))
    }
    const min = Math.min(...limits)
    const max = Math.max(...limits)

    return {
        min: min - len / 2,
        max: max + len / 2
    }
}

const calcBounds = params => 
    params.map(({ offsetX, offsetY, velX, velY, accX, accY, lifetime, width, height }) => {
        const len = Math.max(width, height)
        return {
            x: calc1DBounds(offsetX, velX, accX, lifetime, len),
            y: calc1DBounds(offsetY, velY, accY, lifetime, len)
        }
    }).reduce(({ x: _x, y: _y }, { x, y }) => {
        return {
            x: {
                min: Math.min(_x.min, x.min),
                max: Math.max(_x.max, x.max)
            },
            y: {
                min: Math.min(_y.min, y.max),
                max: Math.max(_y.max, y.max)
            }
        }
    })

export default calcBounds